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
            // pass : "rbdu rhox cyxd fgrm"
        }
    });

    // console.log(process.env.EMAIL_ID);
    // console.log(process.env.EMAIL_PASS);
    

    let mailDetails = {
        // from: process.env.EMAIL_ID,
        to: process.env.EMAIL_ID,
        subject: 'Verification Mail',
        html:`<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://localhost:8000/userData/verify/${msg}">Click here to verify</a>`
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