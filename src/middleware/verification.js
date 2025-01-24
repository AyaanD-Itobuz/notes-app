import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"
import userSchema from "../models/userSchema.js";

export const verifyToken = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("token" , token);
    
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
            console.log(error);
            res.send(
                '"Email verification failed, possibly the link is invalid or expired"'
            );
            res.status(401).json({ error: "Unauthorized" });
        } 
        else 
        {
            await userSchema.findOneAndUpdate(
                { token: token },
                { $set: { verified: "true", token: null } },
                { new: true }
            );
            res.send("Email verified successfully");
        }
    });
};