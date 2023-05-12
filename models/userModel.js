const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exist!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'donor'
    },
    donation: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'donation'
        },
    ]
})


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.createJWT = async function () {
    return await jwt.sign({ user_id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;