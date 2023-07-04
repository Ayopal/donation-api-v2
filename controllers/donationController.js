const Donations = require('../models/donationModel')
const Breakdown = require('../models/breakdownModel')
const Users = require('../models/userModel')
const appError = require('../utils/appError')
const { EmailToUsers } = require('../utils/emails')
const Cache = require('../configs/redis')
const logger = require('../utils/logger')

/** 
 * GET MY DONATIONS
*/
exports.getMyDonations = async (req, res, next) => {
    try {

        let donations;
        const user_id = req.user

        donations = await Cache.get(`${user_id}-donations`)

        if(donations)
            return returnDataInCache(donations, res)

        donations = await Donations.find({
            donor_id: user_id
        })

        const cacheValue = JSON.stringify(donations)
        await Cache.set(`${user_id}-donations`, cacheValue)

        return res.status(200).json({
            status: 'success',
            data: {
                donations
            }
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

/** 
 * VERIFY DONATION
*/
exports.verifyDonation = async (req, res, next) => {

    try {

        const donation_id = req.params.id

        const donation = await Donations.findByIdAndUpdate(donation_id, {
            verified: 'verified'
        })

        const breakdown = await Breakdown.findOne()

        breakdown.total += donation.amount
        await breakdown.save()

        return res.status(201).json({
            status: 'success',
            message: 'Donation verification successful!',
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

/** 
 * REJECT DONATION
*/
exports.declineDonation = async (req, res, next) => {
    try {

        const { note } = req.body

        const donation_id = req.params.id

        const donation = await Donations.findById(donation_id)
        const user = await Users.findById(donation.donor_id)

        donation.verified = 'declined'
        await donation.save()

        user.note = note

        const url = `${req.protocol}://${req.get('host')}`

        if (process.env.NODE_ENV === 'production') {
            await new EmailToUsers(user, url).sendDeclinedDonation()
        }

        return res.status(201).json({
            status: 'success',
            message: 'Donation declined with note',
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}

/** 
 * GET ALL DONATIONS
*/
exports.getAllDonations = async (req, res, next) => {

    try {

        let allDonations;
        let cacheKey = 'allDonations'

        allDonations = await Cache.get(cacheKey)

        if (allDonations)
            return returnDataInCache(allDonations, res)

        allDonations = await Donations.find({
            verified: 'verified'
        })

        let cacheValue = JSON.stringify(allDonations)
        await Cache.set(cacheKey, cacheValue)

        return res.status(200).json({
            status: 'success',
            data: {
                allDonations
            }
        })

    } catch (error) {
        logger.error(error)
        return next(new appError(error.message, error.statusCode))
    }
}

const returnDataInCache = async (donations, res) => {
    try {

        donations = JSON.parse(donations)

        return res.status(200).json({
            status: 'success',
            data: {
                donations
            }
        })

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
}