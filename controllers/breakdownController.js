const Breakdown = require('../models/breakdownModel')
const appError = require('../utils/appError')

/** Get Breakdown
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getBreakdown = async (req, res, next) => {

    try {
        const breakdown = await Breakdown.findOne()

        return res.status(200).json({
            status: 'success',
            message: 'Donation Breakdown',
            data: {
                breakdown
            }
        })
    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}


/* Post Disburse 
 */
exports.postDisbursed = async (req, res, next) => {
    try {
        let { amount } = req.body
        amount = Number(amount)

        const breakdown = await Breakdown.findOne()

        breakdown.disbursed += amount
        breakdown.balance = breakdown.total - breakdown.disbursed
        await breakdown.save()

        return res.status(201).json({
            status: 'success',
            message: 'Disbursement updated successfully!'
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}




