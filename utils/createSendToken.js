const Donations = require('../models/donationModel')

//CREATE FUNCTION THAT HANDLES TOKEN RESPONSE & COOKIE RESPONSE
exports.createSendToken = async (user, statusCode, res) => {
    // CREATE JWT WITH MODEL INSTANCE
    const token = await user.createJWT();
    const cookieOptions = {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // SEND TOKEN TO CLIENT
    res.cookie("jwt", token, cookieOptions);

    user.password = undefined

    const data = {
        user,
        token,
    }

    // if admin, add pending verification to res data
    if ((user.role === 'admin')) {

        const pending = await Donations.find({
            verified: 'pending'
        })

        data.pendingDonations = pending
    }

    res.status(statusCode).json({
        status: "Success",
        data,
    });
};