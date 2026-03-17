const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    industry: { type: String, required: true },
    role: { type: String, required: true },
    bullets: [String], // Action verbed bullets
    tips: [String]
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);
