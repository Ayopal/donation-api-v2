// ALLOW ONLY ADMIN
const Users = require('../models/userModel')
const appError = require('../utils/appError')


exports.allowAdmin = (req, res, next) => {
    const user_id = req.user

    const user = Users.findById(user_id)

    if (!(user.role === 'admin')) {
        throw new appError('Unauthorized', 401)
    }

    return next()
}