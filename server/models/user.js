const mongoose = require('mongoose')

// Destructuring Schema from mongoose
const { Schema } = mongoose

// Defining the schema for the user
const userSchema = new  Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

// Creating a model based on the schema, named 'User'
const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel