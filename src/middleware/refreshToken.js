import jwt from "jsonwebtoken"
import generateToken from "../middleware/generateToken.js"
import { config } from "dotenv";

config(); 

export const verifyRefreshToken = async(req , res, next) => {
    let token = String(String(req.headers.authorization).split(" ")[1])
    // console.log(token)

    if(!token)
    {
        return res.status(400).json({message : "Token not Found"})
    }

    jwt.verify(token , process.env.SECRET_KEY , async(error , decoded) => {
        // console.log("Decoded Refresh Token: " , decoded);
        if(error)
        {
            res.json({
                status : 200,
                message : error.message
            })
        }
        req.userId = decoded.userId;
        next();
    })   
}


export const generateAccessToken = async(req , res) => {
    try {
        const userId = req.userId;
        const refreshToken = String(String(req.headers.authorization).split(' ')[1])
        
        if(refreshToken)
        {
            const newAccessToken = generateToken(userId , "1hr");
    
            if (newAccessToken)
            {
                res.status(201).json({
                token: newAccessToken,
                refreshToken : refreshToken,
                success: true,
                message: "User loggedin successfully.",
              });
            }
            else 
            {
                res.json({
                    status : 400,
                    message : "New Token Not generated"
                })
            }
        }
        
    } catch (error) {
        res.json({
            status : 400,
            message : "Error Occured" + error.message
        })
    }
}

