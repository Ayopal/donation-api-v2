const mailGun = require('mailgun-js')
const appError = require('../utils/appError')
require('dotenv').config()

const mailgunAuth = {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
};

const mg = mailGun(mailgunAuth)

const DEV_ADMIN_MAIL = process.env.DEV_ADMIN_MAIL
const PROD_ADMIN_MAIL = process.env.PROD_ADMIN_MAIL

class EmailToUsers {
    constructor(user, url) {
        this.to = user.email;
        this.firstname = user.firstname
        this.url = url
        this.from = `${process.env.EMAIL_SENDER} ${process.env.EMAIL_FROM}`;
        this.note = user.note ? user.note : undefined;
    }

    async send(template, subject) {

        const data = {
            from: this.from,
            to: this.to,
            subject,
            template,
            'h:X-Mailgun-Variables': JSON.stringify({
                firstname: this.firstname,
                url: this.url,
                note: this.note,
            })
        }

        try {
            await mg.messages().send(data)
        } catch (error) {
            throw new appError(error.message, 500)
        }

    }

    // SEND WELCOME MAIL
    async sendWelcome() {
        await this.send("test-welcome", "Welcome! Luke 6:38");
    }

    // SEND PASSWORD RESET LINK
    async sendPasswordReset() {
        await this.send("reset-password", "Your password reset link(valid for only 10 minutes)");
    }

    // SEND SUCCESFUL PASSWORD RESET MAIL
    async sendVerifiedPSWD() {
        await this.send('verified-pswd', 'You have reset your password successfully!')
    }

    async sendRejectedDonation(){
        await this.send('reject-donation', 'A message from Admin')
    }
}

class EmailToAdmin {
    constructor(url) {
        this.to = process.env.NODE_ENV === 'production' ? process.env.PROD_ADMIN_MAIL : process.env.DEV_ADMIN_MAIL
        this.url = url
        this.from = `${process.env.EMAIL_SENDER} ${process.env.EMAIL_FROM}`;
    }

    async send(template, subject) {

        const data = {
            from: this.from,
            to: this.to,
            subject,
            template,
            'h:X-Mailgun-Variables': JSON.stringify({
                url: this.url,
            })
        }

        try {
            await mg.messages().send(data)
        } catch (error) {
            throw new appError(error.message, 500)
        }

    }

    // NOTIFY ADMIN OF DONATION
    async noftifyAdmin() {
        await this.send('notify-admin', 'Some person(s) have made donation(s)')
    }
}


module.exports = { EmailToUsers, EmailToAdmin }