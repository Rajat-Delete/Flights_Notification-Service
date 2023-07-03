const {EmailService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const { SuccesResponse , ErrorResponse } = require('../utils/common');
async function create(request,response,next){
    try {
        const resp = await EmailService.createTicket({
            subject: request.body.subject,
            content : request.body.content,
            recepientEmail : request.body.recepientEmail
        });
        SuccesResponse.data = resp;
        return response
        .status(StatusCodes.CREATED)
        .json(SuccesResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return response
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports = {
    create,
}