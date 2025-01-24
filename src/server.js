import express from "express";
import route from "./routes/userRoute.js";
import dbConnect from "./config/dbConnection.js";
import dotenv from "dotenv";



const app = express();
app.use(express.json());

dotenv.config({ path: '.env' });

const port = process.env.PORT;

app.use("/userData", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

dbConnect();


