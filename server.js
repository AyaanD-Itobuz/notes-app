import express from "express";
import route from "./src/routes/userRoute.js"
import dbConnect from "./src/config/dbConnection.js";
import dotenv from "dotenv/config";


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/userData' , route)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

dbConnect()