const express = require('express')
const router = express.Router()

const authorize = require('./../middlewares/authorize')
const restrictTo = require('./../middlewares/restrictTo')
const donationRouter = require('./donationRouter')
const breakdownRouter = require('./breakdownRouter')

const {
    notifyAdmin,
} = require('./../controllers/userController')

const { getMyDonations } = require('./../controllers/donationController')


router.use(authorize)

router.post('/notify', notifyAdmin)

router.use('/donations', donationRouter)

router.get('/me/donations', restrictTo('admin'), getMyDonations)

module.exports = router

