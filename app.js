const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const httpLogger = require('./utils/httpLogger')

const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const donationRouter = require('./routers/donationRouter')

const appError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
require('./models/db').init()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(httpLogger)

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcome'
    })
})

// REGISTER ROUTES
app.use('/api/v2/auth', authRouter)
app.use('/api/v2/user', userRouter)
app.use('/api/v2/donations', donationRouter)

app.use('*', (req, res, next) => {
    return next(new appError(`${req.originalUrl} not found on this server`, 404));
})

app.use(globalErrorHandler)
module.exports = app