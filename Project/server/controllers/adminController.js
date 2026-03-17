const User = require('../models/User');
const Log = require('../models/Log');

// @desc    Get all users (for validation)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Validate user (Recruiter/Coach)
// @route   PUT /api/admin/validate/:id
// @access  Private/Admin
const validateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isVerified = true;
        await user.save();

        // Log action
        await Log.create({
            action: 'USER_VALIDATED',
            user: req.user.id,
            details: { targetUser: user.email }
        });

        res.json({ message: 'User validated' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get Logs
// @route   GET /api/admin/logs
// @access  Private/Admin
const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getUsers, validateUser, getLogs };
