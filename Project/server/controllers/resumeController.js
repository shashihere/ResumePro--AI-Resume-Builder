const Resume = require('../models/Resume');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

// @desc    Create or Update Resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    try {
        console.log('createResume called with:', req.body.personalInfo?.fullName);
        console.log('Resume ID present?', req.body._id);
        const { templateId, personalInfo, experience, education, skills, projects, title, visualConfig } = req.body;

        // If ID provided, Update existing
        if (req.body._id) {
            const resume = await Resume.findById(req.body._id);
            if (resume && resume.user.toString() === req.user.id) {
                resume.templateId = templateId || resume.templateId;
                resume.personalInfo = personalInfo || resume.personalInfo;
                resume.experience = experience || resume.experience;
                resume.education = education || resume.education;
                resume.skills = skills || resume.skills;
                resume.projects = projects || resume.projects;
                resume.title = title || resume.title;
                resume.visualConfig = visualConfig || resume.visualConfig;

                const updated = await resume.save();
                return res.json(updated);
            }
        }

        // CREATE NEW (Distinct from update, never overwrites old ones based on user ID)
        const newResume = await Resume.create({
            user: req.user._id,
            templateId,
            personalInfo,
            experience,
            education,
            skills,
            projects,
            title,
            visualConfig
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get All Resumes for User
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    try {
        console.log('Fetching resumes for user:', req.user._id);
        const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
        console.log('Found resumes count:', resumes.length);
        res.json(resumes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get Resume (Compressed) - Single
// @route   GET /api/resumes/:id
// @access  Private
const getResume = async (req, res) => {
    // Placeholder if needed in future
};


// @desc    Upload Profile Image (Stream)
// @route   POST /api/resumes/upload
// @access  Private
const uploadImage = (req, res) => {
    const filePath = path.join(__dirname, '../uploads', `upload_${Date.now()}_${req.user._id}.png`);
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
        res.json({ message: 'File uploaded successfully', path: filePath });
    });

    writeStream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'Upload failed' });
    });
};

// @desc    Delete Resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await resume.deleteOne();

        res.json({ message: 'Resume removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Autosave Resume
// @route   PUT /api/resumes/autosave
// @access  Private
const autosaveResume = async (req, res) => {
    try {
        const { _id, ...data } = req.body;
        if (_id) {
            const resume = await Resume.findById(_id);
            if (resume && resume.user.toString() === req.user.id) {
                Object.assign(resume, data);
                await resume.save();
                return res.json({ message: 'Autosaved' });
            }
        }
        res.status(404).json({ message: 'Resume not found for autosave' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Autosave failed' });
    }
}

// @desc    Export Resume to PDF
// @route   GET /api/resumes/export/:id
// @access  Private
const exportResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Fonts
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontTimes = await pdfDoc.embedFont(StandardFonts.TimesRoman); // For Serif option

        // Selected Font
        const isSerif = resume.visualConfig?.font === 'font-serif';
        const isHeading = resume.visualConfig?.font === 'font-heading';
        const mainFont = isSerif ? fontTimes : fontRegular;
        const headFont = isSerif ? fontTimes : fontBold;


        // Colors
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000');
            return result ? rgb(parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255) : rgb(0, 0, 0);
        }
        const accentColor = hexToRgb(resume.visualConfig?.accent || '#000000');
        const blackColor = rgb(0, 0, 0);
        const grayColor = rgb(0.4, 0.4, 0.4);

        let y = height - 50;
        const leftMargin = 50;

        // --- HEADER ---
        page.drawText(resume.personalInfo.fullName || '', { x: leftMargin, y, size: 24, font: headFont, color: blackColor });
        y -= 25;
        page.drawText(resume.personalInfo.title || '', { x: leftMargin, y, size: 14, font: mainFont, color: accentColor });
        y -= 20;

        const contactLine = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.address].filter(Boolean).join('  |  ');
        page.drawText(contactLine, { x: leftMargin, y, size: 10, font: mainFont, color: grayColor });
        y -= 40;

        // --- SUMMARY ---
        if (resume.personalInfo.summary) {
            page.drawText('PROFESSIONAL SUMMARY', { x: leftMargin, y, size: 12, font: headFont, color: accentColor });
            y -= 5;
            page.drawLine({ start: { x: leftMargin, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
            y -= 20;

            const summaryLines = splitText(resume.personalInfo.summary, 90);
            summaryLines.forEach(line => {
                page.drawText(line, { x: leftMargin, y, size: 10, font: mainFont, color: blackColor });
                y -= 14;
            });
            y -= 20;
        }

        // --- EXPERIENCE ---
        if (resume.experience && resume.experience.length > 0) {
            page.drawText('EXPERIENCE', { x: leftMargin, y, size: 12, font: headFont, color: accentColor });
            y -= 5;
            page.drawLine({ start: { x: leftMargin, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
            y -= 20;

            resume.experience.forEach(exp => {
                page.drawText(exp.title || '', { x: leftMargin, y, size: 11, font: headFont });
                page.drawText(exp.duration || '', { x: width - 150, y, size: 11, font: headFont, align: 'right' });
                y -= 15;
                page.drawText(exp.company || '', { x: leftMargin, y, size: 10, font: mainFont, color: grayColor });
                y -= 20;

                if (exp.description) {
                    const descLines = splitText(exp.description, 90);
                    descLines.forEach(line => {
                        page.drawText(line, { x: leftMargin + 10, y, size: 10, font: mainFont });
                        y -= 14;
                    });
                }
                y -= 15;
            });
            y -= 10;
        }

        // --- EDUCATION ---
        if (resume.education && resume.education.length > 0) {
            page.drawText('EDUCATION', { x: leftMargin, y, size: 12, font: headFont, color: accentColor });
            y -= 5;
            page.drawLine({ start: { x: leftMargin, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
            y -= 20;

            resume.education.forEach(ed => {
                page.drawText(ed.school || '', { x: leftMargin, y, size: 11, font: headFont });
                page.drawText(ed.year || '', { x: width - 150, y, size: 11, font: headFont });
                y -= 15;
                page.drawText(ed.degree || '', { x: leftMargin, y, size: 10, font: mainFont });
                y -= 25;
            });
        }

        // --- SKILLS ---
        if (resume.skills && resume.skills.length > 0) {
            y -= 10;
            page.drawText('SKILLS', { x: leftMargin, y, size: 12, font: headFont, color: accentColor });
            y -= 5;
            page.drawLine({ start: { x: leftMargin, y }, end: { x: width - 50, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
            y -= 20;

            const skillsText = resume.skills.join('  •  ');
            const skillLines = splitText(skillsText, 90);
            skillLines.forEach(line => {
                page.drawText(line, { x: leftMargin, y, size: 10, font: mainFont });
                y -= 14;
            });
        }

        const pdfBytes = await pdfDoc.save();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="resume_${resume._id}.pdf"`,
        });
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ message: 'Export failed' });
    }
}

function splitText(text, maxChars) {
    if (!text) return [];
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        if (currentLine.length + 1 + words[i].length <= maxChars) {
            currentLine += ' ' + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    return lines;
}


module.exports = {
    createResume,
    getResumes,
    getResume,
    uploadImage,
    deleteResume,
    autosaveResume,
    exportResume
};
