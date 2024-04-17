const bcrypt = require('bcrypt')

// Function to hash a password
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generating a salt with a complexity factor of 12
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            // Hashing the password with the generated salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                // If successful, resolve with the hashed password
                resolve(hash)
            })
        })
    })
}

// Function to compare a password with its hashed version
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}