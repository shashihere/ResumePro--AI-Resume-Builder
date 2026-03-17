const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: { type: String, required: true }, // e.g., 'Tech', 'Medical'
    tags: [String],
    designStyle: { type: String, enum: ['Modern', 'Classic', 'Creative', 'Minimal'], default: 'Modern' },
    previewImage: { type: String }, // URL
    structure: { type: Object }, // JSON for layout
    isAtsFriendly: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);
