//const {ServerConfig} = require('./config'); //This is special syntax in JSX.It is used to evaluate JS expression during complilation
const express = require('express');

const apiroutes = require('./routes')
const { ServerConfig, Logger } = require('./config');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api', apiroutes);

//for testing purpose
const mailsender = require('./config/email-config');





app.listen(ServerConfig.PORT, async (req,res) =>{
    console.log(`App is running on the port no: ${ServerConfig.PORT}`);
    Logger.info("Successfully Started the Server",{})
    try {
    const response = await mailsender.sendMail({
    from:ServerConfig.GMAIL_EMAIL,
    to:'rajatsharma17398@gmail.com',
    subject : 'Is this Service Working?',
    text : 'For testing Purpose',
    html : '<b>Hi Rajat, Your Flight is Booked!</b>'
    });

    console.log(response);

    } catch (error) {
     console.log(error);   
    }
    
})








