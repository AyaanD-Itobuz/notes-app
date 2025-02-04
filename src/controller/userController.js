import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js"
import sendEmail from "../emailVerify/userSendEmail.js";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateToken.js";
import { config } from "dotenv";

config(); 


export const register = async (req , res) => {
  try {
    const { userName, email, password } = req.body;
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

export const login = async (req , res , next) => {
  try {
    const email = req.body.email;
    const pws = req.body.password;
    const fetchData = await userSchema.findOne({ email });

    bcrypt.compare(pws, fetchData.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Authentication Error",
        });
      } else {
        if (fetchData.verified) {
          const accessToken = generateToken(fetchData._id , "5s");
          const refreshToken = generateToken(fetchData._id , "7d");

          fetchData.isLoggedIn = true;
          fetchData.save();


          res.status(201).json({
            token: accessToken,
            refreshToken : refreshToken,
            success: true,
            message: "User loggedin successfully and Session updated",
          });
          
          
        } else {
          res.status(400).json({
            success: false,
            data: "user is not verified",
          });
        }
      }
    });
    req.userId = fetchData._id;
    next();
  }
  catch (error) {
    res.json({
      message: "" + error,
    });
  }
};

export const createSession = async( req , res ) => {
  try 
  {
    await sessionSchema.create({userId : req.userId});

  }
  catch(error)
  {
    res.json({
      status : 400,
      message : "Session Not Created",
      error : "" + error.message
    })
  }
};

export const deleteSession = async( req , res ) => {
  try {
    const userId = req.body.userId;
    const data = await sessionSchema.deleteMany({userId});
    const fetchData = await userSchema.findOne({_id : userId});

    if(data)
    {
      fetchData.isLoggedIn = false;
      fetchData.save(); 
      res.json({
        status : 400,
        message : "All Sessions Deleted Successfully"
      })
    }

    else {
      res.json({
        status : 200,
        message : "No Session Found"
      })
    }
  }
  catch(error) {
    res.json({
      status : 200,
      message : "Error Occured: " + error.message
    })
  }
};