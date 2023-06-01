// middleware for admin routes
const express = require('express')
const router = express.Router()
const allowAdmin = require('../middlewares/allowAdmin')
const authorize = require('../middlewares/authorize')

const { getAllDonations, getMyDonations,
    getBreakdown, verify, postDisbursed,
    decline
} = require('../controllers/adminController')

router.use([authorize, allowAdmin])

router.get('/donations', getAllDonations)
router.get('/my-donations', getMyDonations)
router.get('/breakdown', getBreakdown)
router.patch('/verify/:id', verify)
router.patch('/disburse', postDisbursed)
router.post('/decline/:id', decline)

module.exports = router