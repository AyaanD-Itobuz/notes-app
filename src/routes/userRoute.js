import express from 'express';

import {createSession, deleteSession, register} from "../controller/userController.js"
import verifyToken  from '../middleware/verification.js';
import { login } from '../controller/userController.js';
import { userLoginSchema } from '../validator/userDataSchema.js';
import { validateLogin } from '../middleware/validate.js';




const route = express.Router();

route.post("/register",validateLogin(userLoginSchema), register);
// route.get("/verify/:token", verifyToken); //For getting the token from URL
route.get("/verify", verifyToken);
route.post("/login" , login , createSession);
route.delete("/logout" , deleteSession);

export default route;