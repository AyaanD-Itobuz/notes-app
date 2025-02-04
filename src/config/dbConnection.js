import mongoose from "mongoose";
import { config } from "dotenv";

config(); 

const url=   process.env.DB_URL;

async function dbConnect() {
    
    await mongoose.connect(url)
    .then(() => {
        console.log("DB Connected");
    })

    .catch ((e) => {
        console.log(`DB Connection Failed ${e}`)
    })
}

export default dbConnect;