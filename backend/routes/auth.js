const router = require('express').Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');

// Register and login routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/me', protect, getUserProfile);

module.exports = router; 