import jwt from "jsonwebtoken";
// import { jwtDecode } from "jwt-decode";
import { config } from "dotenv";

config(); 

export const decodeToken = async(req , res , next) => {

    let accessToken = String(req.headers.authorization);
    accessToken = String(accessToken.split(' ')[1]);

    
    if(!accessToken)
    {
        return res.status(400).json({message : "Token not Found"})
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, async (error, decoded) => {        
        if(error)
        {
            console.log(error);
            return res.status(401).json({error : error.message , message : "Token expired generate a new Token"});
        }
        req.userId = decoded.userId;
        next();
    });
}