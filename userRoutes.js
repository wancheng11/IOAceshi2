const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { addEmployee, getEmployees } = require('../controllers/userController');

router.post('/', protect, admin, addEmployee);
router.get('/', protect, admin, getEmployees);

module.exports = router; 