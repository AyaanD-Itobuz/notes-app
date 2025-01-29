import jwt from "jsonwebtoken";

function generateToken(userId) {
    const secretKey = process.env.SECRET_KEY;
  
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "60m" });
  
    return token;
};

export default generateToken;