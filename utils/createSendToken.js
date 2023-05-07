//CREATE FUNCTION THAT HANDLES TOKEN RESPONSE & COOKIE RESPONSE
exports.createSendToken = async (user, statusCode, res) => {
    // CREATE JWT WITH MODEL INSTANCE
    const token = await user.createJwt();
    const cookieOptions = {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // SEND TOKEN TO CLIENT
    res.cookie("jwt", token, cookieOptions);

    user.password = undefined

    res.status(statusCode).json({
        status: "Success",
        data: {
            user,
            token,
        },
    });
};