// ALLOW ONLY ADMIN
const Users = require('../models/userModel')
const appError = require('../utils/appError')

/** 
 * RESTRICT ACCESS TO THE SPECIFIED ROLE 
*/
const restrictTo = ( role ) => {
    return async (req, res, next) => {
        try {
            const user_id = req.user

            const user = await Users.findById(user_id)

            if (!(user.role === role)) {
                return next(new appError('Unauthorized', 401))
            }

            return next()
        } catch (error) {
            return next(new appError(error.message, error.statusCode))
        }
    }
}


module.exports = restrictTo