import nodemailer from 'nodemailer';
import dotenv from "dotenv";


const sendEmail = async(msg, to) => 
{
    const mailTransporter = nodemailer.createTransport ({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL_ID,
            // user : "ayaan@itobuz.com",
            pass : process.env.EMAIL_PASS,
            // pass : "vewi jkki mbae kkkq"
        }
    });

    console.log(process.env.EMAIL_ID);

    let mailDetails = {
        // from: process.env.EMAIL_ID,
        to: to,
        subject: 'Verification Mail',
        html:`<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://localhost:8000/verify/?token=${msg}">Click here to verify</a>`
    };
    
    mailTransporter.sendMail(mailDetails,
            function (err, data) {
                if (err) {
                    console.log('Error Occurs: ' + err);
                } else {
                    console.log('Email sent successfully');
                }
            });
}

export default sendEmail;