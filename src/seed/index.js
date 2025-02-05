import mongoose from "mongoose";
import { config } from "dotenv";
config();

import userSchema from "../models/userSchema.js";
import notesSchema from "../models/notesSchema.js";
import sessionSchema from "../models/sessionSchema.js"
import dbConnect from "../config/dbConnection.js";
import { userSeed } from "./userSeed.js";
import { noteSeed } from "./noteSeed.js";

dbConnect();

const reset = async () => {
    await userSchema.deleteMany();
    await notesSchema.deleteMany();
    await sessionSchema.deleteMany();
    console.log("Database reset");
};

const seed = async () => {
    await userSeed(20);
    await noteSeed(20);
    mongoose.connection.close();
};

reset();
seed();
