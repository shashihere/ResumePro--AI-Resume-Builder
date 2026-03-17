const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/roleAuth');

router.get('/me', protect, getMyProfile);
router.post('/', protect, updateProfile);

module.exports = router;
