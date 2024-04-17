// Importing required modules
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose')

// Initializing app
const app = express();
const cookieParser = require('cookie-parser')

// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// Middleware Setup
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

// Routing setup
app.use('/', require('./routes/authRoutes'))

// Starting the server
const port = 8000
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})