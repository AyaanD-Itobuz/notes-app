import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';



export const register = async (req, res) => {
    try {
        const { userName, email, password} = req.body;

        //checking for existing user
        const userExists = await userSchema.findOne({ email });

        if (userExists) {
            throw new Error("User Already Exists");
        }

        //creating new user
        const data = await userSchema.create({ userName, email, password, verified: false });

        if (data) {
            res.json({
                status: 200,
                data: data,
                message: "User Created"
            });
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

const generateToken = (password) => {
    const secretKey = "top-secret";

    const token = jwt.sign(password , secretKey , { expiresIn : '1hr' })

    console.log(token);
}