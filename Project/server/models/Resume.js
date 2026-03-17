const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    templateId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'My Resume',
    },
    visualConfig: {
        font: { type: String, default: 'font-sans' },
        color: { type: String, default: '#0B132B' },
        accent: { type: String, default: '#FFC300' }
    },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        title: String,
        summary: String,
        linkedin: String, // Optional, keeping for future
        portfolio: String,
    },
    // Changed to match Frontend: { title, company, duration, description }
    experience: [
        {
            title: String,
            company: String,
            duration: String, // simplified from startDate/endDate
            description: String,
        }
    ],
    // Changed to match Frontend/Defaults: { degree, school, year }
    education: [
        {
            school: String,
            degree: String,
            year: String,
        }
    ],
    // UPDATED: Structured Skills for Industry Grouping (e.g. "Tech Stack", "Tools", "Compliance")
    skills: [
        {
            category: { type: String, default: 'Key Skills' },
            items: [String]
        }
    ],
    // NEW: Certifications Section
    certifications: [
        {
            name: String,
            issuer: String,
            year: String
        }
    ],
    projects: [
        {
            title: String, // standardized to 'title' from 'name'
            description: String,
            link: String,
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
