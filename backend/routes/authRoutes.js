const express = require('express');
const { protect } = require('../middleware/auth');
const {register, login,  getProfile } = require('../controllers/authController');
const router = express.Router();

router.get('/profile', protect, getProfile);

router.post('/signup', register);
router.post('/login', login);

module.exports = router;

