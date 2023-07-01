const cron = require('node-cron')
const Donations = require('../models/donationModel')
const { EmailToAdmin } = require('./emails')
const appError = require('./appError')
const logger = require('./logger')

// DEFINE TASK SCHEDULER TO NOTIFY ADMIN WHEN DONATIONS ARE MADE
exports.notifyAdmin = cron.schedule('0 23 * * *', async () => {  // RUN AT 23:00 EVERYDAY
    try {

        const count = await Donations.countDocuments({ verified: 'pending' })

        if (count < 1) {
            logger.info(`NO DONATIONS TODAY!`);
        }

        logger.info(`${count} NEW DONATION(S)!`);

        const url = `${req.protocol}://${req.get('host')}/admin`

        await new EmailToAdmin(url).noftifyAdmin()
        return;

    } catch (error) {
        return next(new appError(error.message, error.statusCode))
    }
})
