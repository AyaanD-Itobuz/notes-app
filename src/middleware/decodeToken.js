import jwt from "jsonwebtoken";
// import { jwtDecode } from "jwt-decode";
import dotenv from "dotenv/config"

export const decodeToken = async(req , res , next) => {

    let accessToken = String(req.headers.authorization);
    accessToken = String(accessToken.split(' ')[1]);
    console.log(accessToken);

    
    if(!accessToken)
    {
        return res.status(401).json({message : "Token not Found"})
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, async (error, decoded) => {
        console.log("decoded: ",decoded.userId);
        if(error)
        {
            console.log(error);
            return res.status(401).json({error : "Token is invalid"});
        }
        req.userId = decoded.userId;
        next();
    });
}





// async function decodeToken(accessToken) {
//     jwt.verify(accessToken, process.env.SECRET_KEY, async (error, decoded) => {
//         console.log(decoded);
//         if (error) {
//             console.log(error);
//             return res.status(401).json({ error: "Token is invalid" });
//         } 

//         await userSchema.findOneAndUpdate(
//             { _id: decoded.userId },
//             { $set: { verified: "true", token: null } },
//             { new: true }
//         );
//         res.send("Email verified successfully, hi");
//     });
// }

