const Template = require('../models/Template');

// @desc    Get all templates (with filters)
// @route   GET /api/templates
// @access  Public
const getTemplates = async (req, res) => {
    try {
        const { industry, designStyle } = req.query;
        let query = {};

        if (industry) query.industry = industry;
        if (designStyle) query.designStyle = designStyle;

        const templates = await Template.find(query);
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create template (Admin)
// @route   POST /api/templates
// @access  Private/Admin
const createTemplate = async (req, res) => {
    try {
        const template = await Template.create(req.body);
        res.status(201).json(template);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { getTemplates, createTemplate };
