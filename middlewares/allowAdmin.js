// ALLOW ONLY ADMIN
const Users = require('../models/userModel')
const appError = require('../utils/appError')


const allowAdmin = async (req, res, next) => {
    try {
        const user_id = req.user

        const user = await Users.findById(user_id)

        if (!(user.role === 'admin')) {
            return next(new appError('Unauthorized', 401))
        }

        return next()
    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

module.exports = allowAdmin