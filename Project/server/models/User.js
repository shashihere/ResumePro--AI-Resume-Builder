const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['jobseeker', 'recruiter', 'jobcoach', 'admin'],
        default: 'jobseeker',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    provider: {
        type: String,
        default: 'local'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
