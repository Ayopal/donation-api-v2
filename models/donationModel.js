const mongoose = require('mongoose')
const { Schema } = mongoose

const donationSchema = new Schema({
    amount: Number,
    date: {
        type: Date,
        default: Date.now
    },
    donor_id: { type: mongoose.Types.ObjectId, ref: 'user' },
    verified: {
        type: String,
        default: 'pending',
        enum: ['pending', 'verified', 'declined']
    }

})

const donationModel = mongoose.model('donation', donationSchema)
module.exports = donationModel;