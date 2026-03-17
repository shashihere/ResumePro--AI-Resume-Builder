const express = require('express');
const router = express.Router();
const { getUsers, validateUser, getLogs } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/roleAuth');

router.get('/users', protect, authorize('admin'), getUsers);
router.put('/validate/:id', protect, authorize('admin'), validateUser);
router.get('/logs', protect, authorize('admin'), getLogs);

module.exports = router;
