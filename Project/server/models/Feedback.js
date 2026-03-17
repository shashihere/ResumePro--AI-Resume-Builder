const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
