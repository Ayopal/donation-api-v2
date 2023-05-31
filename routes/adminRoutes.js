// middleware for admin routes
const express = require('express')

const router = express.Router()

const allowAdmin = require('../middlewares/allowAdmin')

router.use(allowAdmin)