const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Template = require('./models/Template');
const Suggestion = require('./models/Suggestion');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_builder')
    .then(() => seedDB());

const seedDB = async () => {
    try {
        console.log('--- Seeding Database ---');

        // Clear existing
        await Template.deleteMany({});
        await Suggestion.deleteMany({});

        // Seed Templates
        const templates = [
            {
                name: 'Modern Tech',
                industry: 'Tech',
                tags: ['software', 'developer', 'modern'],
                designStyle: 'Modern',
                structure: { layout: 'sidebar-left', colors: ['#0f172a', '#3b82f6'] }
            },
            {
                name: 'Corporate Finance',
                industry: 'Finance',
                tags: ['finance', 'analyst', 'classic'],
                designStyle: 'Classic',
                structure: { layout: 'single-column', colors: ['#000000', '#ffffff'] }
            },
            {
                name: 'Creative Portfolio',
                industry: 'Design',
                tags: ['designer', 'ux', 'creative'],
                designStyle: 'Creative',
                structure: { layout: 'grid', colors: ['#ec4899', '#f3f4f6'] }
            }
        ];

        await Template.insertMany(templates);
        console.log('Templates Seeded');

        // Seed Suggestions
        const suggestions = [
            {
                industry: 'Tech',
                role: 'Frontend Developer',
                bullets: [
                    'Developed responsive web applications using React and Redux',
                    'Optimized website performance achieving 90+ Lighthouse score',
                    'Collaborated with UX designers to implement pixel-perfect interfaces'
                ],
                tips: ['Highlight your GitHub profile', 'List technical skills at the top']
            },
            {
                industry: 'Finance',
                role: 'Financial Analyst',
                bullets: [
                    'Analyzed financial data to identify trends and opportunities',
                    'Prepared monthly financial reports for executive review',
                    'Managed budget of $5M reducing costs by 15%'
                ],
                tips: ['Use quantifiable metrics', 'Focus on Excel and modeling skills']
            }
        ];

        await Suggestion.insertMany(suggestions);
        console.log('Suggestions Seeded');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
