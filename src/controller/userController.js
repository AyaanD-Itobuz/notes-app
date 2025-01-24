import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config'
import sendEmail from "../emailVerify/userEmailVerification.js";

const generateToken = (userId) => {
    
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ userId } , secretKey , { expiresIn : 60 * 60 })

    // console.log(token);

    return token;
}


export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const body = req.body;

        //checking for existing user
        const userExists = await userSchema.findOne({ email });

        if (userExists) {
            throw new Error("User Already Exists");
        }

        //creating new user
        // const data = await userSchema.create({ userName, email, password, verified: false });

        

        const userData = await userSchema.create({
            userName,
            email,
            password,
        });

        const verification_token = generateToken(userData._id);

        await userSchema.updateOne({
            $where: {
               _id: userData._id
            },
            data: {
                token: verification_token
            }
        })


        
        if (userData) 
        {
            // const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${verification_token}`;
            // const msg = `Please click to verify your email ${verificationUrl}`
            await sendEmail(verification_token, email)

            res.json({
                status: 200,
                data: {
                    id: userData._id,
                },
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


