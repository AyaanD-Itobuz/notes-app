import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import { config } from "dotenv";

config(); 


const verifyToken = async (req, res) => {
    // const { token } = req.params; //For getting the token from the URL
    const authHeader = String(req.headers["authorization"])
    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    // console.log("token" , token);
    
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        console.log(decoded);
        if (error) {
            console.log(error.message);
            return res.status(401).json({ error: "Email verification failed, possibly the link is invalid or expired" });
        } 
            await userSchema.findOneAndUpdate(
                { _id: decoded.userId },
                { $set: { verified: "true", token: null } },
                { new: true }
            );
            res.send("Email verified successfully, hi");
    });
};

export default verifyToken;