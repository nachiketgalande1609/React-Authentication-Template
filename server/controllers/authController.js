// Importing required modules
const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')


// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate Name
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        // Validate Password
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            })
        }
        // Check user exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'User already exists'
            })
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create new user in db
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }
        // Validate password
        const match = await comparePassword(password, user.password)

        // If password matches, generate JWT token
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }

        // If password does not match, return error
        if (!match) {
            res.json({
                error: 'Incorrect password'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// Get user profile
const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        // If token exists, verify it
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            // Return user info
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

// Logout user
const logoutUser = (req, res) => {
    if (req.cookies.token) {
        // If token exists, clear the token cookie
        res.clearCookie('token');
        req.app.set('user', null);
        res.json({ message: 'Logged out successfully' }); // Respond with success message
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}