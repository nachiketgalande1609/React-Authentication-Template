// Importing required modules
const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController')

// Middleware for CORS setup
router.use(
    cors({
        credentials: true,                  // Allows sending cookies
        origin: 'http://localhost:5173'     // Only allows requests from this origin
    })
)

// Routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)          // Route to get user profile info (using cookie)
router.get('/logout', logoutUser);

module.exports = router