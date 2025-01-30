import jwt from "jsonwebtoken";

function generateToken(userId , exp_time) {
    const secretKey = process.env.SECRET_KEY;
  
    const token = jwt.sign({ userId }, secretKey, { expiresIn: exp_time });
  
    return token;
};

export default generateToken;