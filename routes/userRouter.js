const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const {
    notifyAdmin,
} = require('../controllers/userController')

const Donations = require('../models/donationModel')


router.use(authorize)

router.post('/notify', notifyAdmin)


module.exports = router

