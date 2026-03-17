const express = require('express');
const router = express.Router();
const { createResume, getResumes, uploadImage, deleteResume, autosaveResume, exportResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createResume);
router.get('/', protect, getResumes);
router.put('/autosave', protect, autosaveResume);
router.get('/export/:id', protect, exportResume);
router.post('/upload', protect, uploadImage);
router.delete('/:id', protect, deleteResume);

module.exports = router;
