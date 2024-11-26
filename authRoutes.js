const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { login, changePassword } = require('../controllers/authController');

router.post('/login', login);
router.put('/change-password', protect, changePassword);

module.exports = router; 