const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const Users = require('../models/userModel')
const { createSendToken } = require('../utils/createSendToken')
const { createPasswdResetToken } = require('../utils/tokens')



exports.signup = async (req, res, next) => {

    // await Users.deleteMany()

    const { email, password, firstname, lastname, role, adminCode } = req.body

    try {

        if (!(email && password && firstname && lastname)) {
            throw new appError('Please provide full sign up details', 401)
        }

        const oldUser = await Users.findOne({ email })
        if (oldUser) throw new appError("User already exists. Please login", 409);

        // VERIFY ADMIN REGISTRATION
        if (role) {
            // CHECK CODE
            if (`${adminCode}` !== process.env.ADMIN_CODE) throw (new appError('Incorrect Admin Code!', 400))
        }

        const user = await Users.create(req.body)

        createSendToken(user, 201, res)

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    try {
        if (!(email || password)) {
            throw new appError('Please provide login details', 400)
        }

        const user = await Users.findOne({ email })
        // CHECK IF USER EXISTS WITHOUT LEAKING EXTRA INFOS
        if (!user || !(await user.isValidPassword(password))) {
            throw new appError('Email or Password incorrect', 401)
        }

        createSendToken(user, 201, res)

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body
    try {

        const user = await Users.findOne({ email });
        if (!user) throw new appError("No User with that email", 401);

        const { resetToken, passwordToken, passwordResetExpiry } = createPasswdResetToken()

        // TODO: SEND MAIL TO USER TO RESET PASSWORD

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }

}