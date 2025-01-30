import userSchema from "../models/userSchema.js";

// import nodemailer from "nodemailer";
import dotenv from "dotenv/config";
import sendEmail from "../emailVerify/userSendEmail.js";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateToken.js";
// import decodeToken from "../middleware/decodeToken.js";


export const register = async (req , res) => {
  try {
    const { userName, email, password } = req.body;
    const body = req.body;
    // const pws = req.body
    //checking for existing user
    const userExists = await userSchema.findOne({ email });

    if (userExists) {
      throw new Error("User Already Exists");
    }

    //hashing password
    const salt = 10;
    const hashedPws = await bcrypt.hash(password, salt);
    // console.log(hashedPws);

    //creating new user
    const userData = await userSchema.create({
      userName,
      email,
      password: hashedPws,
    });

    const verification_token = generateToken(userData._id , "5m");

    await userSchema.updateOne({
      $where: {
        _id: userData._id,
      },
      data: {
        token: verification_token,
      },
    });

    if (userData) {
      await sendEmail(verification_token, email);

      res.json({
        status: 200,
        data: {
          id: userData._id,
        },
        message: "User Created",
      });
      // console.log("Token : " + verification_token);
    }
  } catch (error) {
    res.json({
      status: 400,
      message: "" + error,
    });
    console.log(error);
  }
};

export const login = async (req , res) => {
  try {
    const email = req.body.email;
    const pws = req.body.password;
    let user_log_status = false;
    // console.log(email);
    // console.log(pws);

    const fetchData = await userSchema.findOne({ email });
    // console.log(fetchData.password);

    bcrypt.compare(pws, fetchData.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          // data: "Error comparing passwords",
        });
      }

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Authentication Error",
          // data: "Incorrect Password",
        });
      } else {
        if (fetchData.verified) {
          const accessToken = generateToken(fetchData._id , "5s");
          const refreshToken = generateToken(fetchData._id , "7d");

          // console.log("accesstoken generated", accessToken);
          fetchData.isLoggedIn = true;
          fetchData.save();

          res.status(201).json({
            token: accessToken,
            refreshToken : refreshToken,
            success: true,
            message: "User loggedin successfully.",
          });
          
          
        } else {
          res.status(400).json({
            success: false,
            data: "user is not verified",
          });
        }
      }
    });
  }
  catch (error) {
    res.json({
      message: "" + error,
    });
  }
};