import express from 'express';

import {register} from "../controller/userController.js"
import verifyToken  from '../middleware/verification.js';
import { login } from '../controller/userController.js';


const route = express.Router();

route.post("/register", register);
// route.get("/verify/:token" , verifyToken);
route.get("/verify/:token", verifyToken);
route.post("/login" , login)

export default route;