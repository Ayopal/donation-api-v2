const Donations = require('../models/donationModel')
const Breakdown = require('../models/breakdownModel')
const Users = require('../models/userModel')
const appError = require('../utils/appError')
const { EmailToUsers } = require('../utils/emails')
const appError = require('../utils/appError')



//getBreakdown
exports.getBreakdown = async (req, res, next) => {

    try {
        const breakdown = await Breakdown.findOne()

        res.status(200).json({
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


//postDisbursed
exports.postDisbursed = async (req, res, next) => {
    try {
        let { amount } = req.body
        amount = Number(amount)

        const breakdown = await Breakdown.findOne()

        breakdown.disbursed += amount
        await breakdown.save()

        res.status(201).json({
            status: 'success',
            message: 'Disbursement updated successfully!'
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}


//getMyDonations
exports.getMyDonations = async (req, res, next) => {
    try {

        const user_id = req.user

        const donations = await Donations.find({
            donor_id: user_id
        })

        res.status(200).json({
            status: 'success',
            message: 'User donations gotten successfully!',
            data: {
                donations
            }
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))

    }
}


//verify
exports.verify = async (req, res, next) => {

    try {

        const donation_id = req.params.id

        const donation = await Donations.findByIdAndUpdate(donation_id, {
            verified: 'verified'
        })

        const breakdown = await Breakdown.findOne()

        breakdown.total += donation.amount
        await breakdown.save()

        res.status(201).json({
            status: 'success',
            message: 'Donation verification successful!',
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

//reject - with note
// send mail to user
exports.reject = async (req, res, next) => {
    try {

        const { note } = req.body

        const donation_id = req.params.id

        const donation = await Donations.findById(donation_id)
        const user = Users.findById(donation.donor_id)

        user.note = note

        const url = `${req.protocol}://${req.get('host')}`

        await new EmailToUsers(user, url).sendRejectedDonation()

        res.status(201).json({
            status: 'failed',
            message: 'Donation rejected with note',
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}


//getAllDonations
exports.getAllDonations = async (req, res, next) => {
    try {

        const donations = Donations.find()

        res.status(200).json({
            status: 'success',
            message: 'All donations',
            data: {
                donations
            }
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}