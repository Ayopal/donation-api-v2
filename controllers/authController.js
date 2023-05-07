const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const Users = require('../models/userModel')
const { createSendToken } = require('../utils/createSendToken')



exports.signup = async (req, res, next) => {

    const { email, password, firstname, lastname, role } = req.body

    try {

        if (!(email || password || firstname || lastname)) {
            throw new appError('Please provide sign up details in full', 401)
        }

        const oldUser = await Users.findOne({ email: email })
        if (oldUser) throw new appError("User already exists. Please login", 409);

        console.log('Done here also!');
        const user = await Users.create(req.body)

        createSendToken(user, 201, res)

    } catch (error) {
        return next(new appError('Unable to register user', 500))
    }
}