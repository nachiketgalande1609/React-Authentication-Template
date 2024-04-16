const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController')

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
// Route to get profile info for using cookie
router.get('/profile', getProfile)
router.get('/logout', logoutUser);


module.exports = router