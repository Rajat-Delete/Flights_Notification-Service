const {TicketRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const {Mailer} = require('../config');
const AppError = require('../utils/errors/app-error');

const ticketRepo = new TicketRepository();

//This function will be used to send the email
async function sendEmail(mailfrom , mailTo , subject,content){
    try {
        const mailresponse = await Mailer.sendMail({
        from: mailfrom,
        to:mailTo,
        subject : subject,
        text : content,
        });

        console.log(mailresponse);

    } catch (error) {
        console.log(error);
        //A possible scenario is to create a entry in DB with status pending
        throw new AppError('Unable to send mail to User' , StatusCodes.PROCESSING);
    }
}

//This will help to create a ticket in our Database
async function createTicket(data){
    try {
        const response = await ticketRepo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//This function will be used to fetch the pending emails from tickets table so that we can apply cron on that.
async function getPendingEmails(){
    try {
        const response = await ticketRepo.getPendingTickets();
        return response;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails,
}