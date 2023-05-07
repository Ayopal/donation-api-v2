const joi = require('joi')
const appError = require('../utils/appError')

// VALIDATOR
const validator = (schema) => async (req, res, next) => {

    try {

        const payload = req.body
        await schema.validateAsync(payload)

        console.log('Done!');
        next()

    } catch (error) {
        return next(new appError(error.message, 400))
    }
}

// USER SIGNUP VALIDATION SCHEMA
const userSignup = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(4)
        .required(),
    confirmPassword: joi.string()
        .valid(joi.ref('password')).required()
        .min(4)
        .required(),
    firstname: joi.string()
        .min(2)
        .max(20)
        .required(),
    lastname: joi.string()
        .min(3)
        .max(30)
        .required()
})

// LOGIN DETAILS VALIDATION SCHEMA
const userLogin = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(4)
        .required(),
})

// DONATION DETAILS VALIDATION SCHEMA
const donationSchema = joi.object({
    // TODO donationschema
    amount: joi.number()
        .required(),
    date: joi.date()
})


exports.validateSignup = validator(userSignup)
exports.validateLogin = validator(userLogin)
exports.validateDonation = validator(donationSchema)