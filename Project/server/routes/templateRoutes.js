const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate } = require('../controllers/templateController');
const { protect, authorize } = require('../middleware/roleAuth');

router.route('/')
    .get(getTemplates)
    .post(protect, authorize('admin'), createTemplate);

module.exports = router;
