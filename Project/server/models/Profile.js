const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    title: { type: String, default: '' }, // e.g., Senior Full Stack Dev
    bio: { type: String, default: '' },
    skills: [String],
    experience: [
        {
            company: String,
            role: String,
            years: Number,
            description: String
        }
    ],
    socials: {
        linkedin: String,
        github: String,
        portfolio: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
