const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const {
    getProfile,
    notifyAdmin,
    getUserDonations
} = require('../controllers/userController')

const Donations = require('../models/donationModel')


router.use(authorize)

router.get('/all', getUserDonations)

router.get('/profile', getProfile)
router.post('/notify', notifyAdmin)


module.exports = router

