//const {ServerConfig} = require('./config'); //This is special syntax in JSX.It is used to evaluate JS expression during complilation
const express = require('express');
const amqplib = require('amqplib');
const apiroutes = require('./routes')
const { ServerConfig, Logger } = require('./config');
const {EmailService} = require('./services')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api', apiroutes);

//for testing purpose
const mailsender = require('./config/email-config');

async function connectQueue(){
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue('Noti-Queue');
        channel.consume('Noti-Queue', (data)=>{
            console.log(`${Buffer.from(data.content)}`);
            const jsondata = JSON.parse(`${Buffer.from(data.content)}`);
            EmailService.sendEmail('airlinenotification88@gmail.com',jsondata.recepientEmail,jsondata.subject,data.content.text);
            // console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);

        })
    } catch (error) {
        console.log(error);
    }
} 




app.listen(ServerConfig.PORT, async (req,res) =>{
    console.log(`App is running on the port no: ${ServerConfig.PORT}`);
    Logger.info("Successfully Started the Server",{})
    // // try {
    // // const response = await mailsender.sendMail({
    // // from:ServerConfig.GMAIL_EMAIL,
    // // to:'rajatsharma17398@gmail.com',
    // // subject : 'Is this Service Working?',
    // // text : 'For testing Purpose',
    // // html : '<b>Hi Rajat, Your Flight is Booked!</b>'
    // // });

    // // console.log(response);

    // } catch (error) {
    //  console.log(error);   
    // }

    await connectQueue();
    console.log('Queue is Up');
    
})








