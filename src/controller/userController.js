import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config'
import sendEmail from "../emailVerify/userEmailVerification.js";

const generateToken = (name) => {
    
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({name} , secretKey , { expiresIn : 60 * 60 })

    // console.log(token);

    return token;
}


export const register = async (req, res) => {
    try {
        const { userName, email, password,token} = req.body;
        const name = req.body;

        //checking for existing user
        const userExists = await userSchema.findOne({ email });

        if (userExists) {
            throw new Error("User Already Exists");
        }

        //creating new user
        // const data = await userSchema.create({ userName, email, password, verified: false });

        const verification_token = generateToken(name);
        console.log(verification_token);
        

        const userData = await userSchema.create({
            userName,
            email,
            password,
            token : verification_token
        });

        
        if (userData) 
        {
            // const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${verification_token}`;
            // const msg = `Please click to verify your email ${verificationUrl}`
            await sendEmail(verification_token)

            res.json({
                status: 200,
                data: userData,
                message: "User Created"
            });
            // console.log("Token : " + verification_token);
            
        }
    }

    catch (error) {
        res.json({
            status: 400,
            message: "" + error
        })
        console.log(error)
    }
}


