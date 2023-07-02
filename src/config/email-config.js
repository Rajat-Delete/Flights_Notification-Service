const nodemailer = require('nodemailer');

const {GMAIL_EMAIL , GMAIL_PASS} = require('../config/serverconfig');

const mailsender = nodemailer.createTransport({
    service : 'Gmail',
    auth:{
        user: GMAIL_EMAIL,
        pass : GMAIL_PASS
    }

})

module.exports = mailsender;