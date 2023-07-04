const express = require('express')
const router = express.Router()

const authorize = require('./../middlewares/authorize')
const restrictTo = require('./../middlewares/restrictTo')
const breakdownRouter = require('./breakdownRouter')

const {
    getAllDonations,
    verifyDonation,
    declineDonation
} = require('./../controllers/donationController')

router.use([authorize, restrictTo('admin')])

router.get('/', getAllDonations)

router.patch('/verify/:id', verifyDonation)

router.post('/decline/:id', declineDonation)

router.use('/breakdown', breakdownRouter)

module.exports = router

