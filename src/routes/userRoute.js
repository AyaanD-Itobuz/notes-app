import express from 'express';

import {register} from "../controller/userController.js"
import verifyToken  from '../middleware/verification.js';
import { login } from '../controller/userController.js';
import { userLoginSchema } from '../validator/userDataSchema.js';
import { validateLogin } from '../middleware/validate.js';




const route = express.Router();

route.post("/register",validateLogin(userLoginSchema), register);
route.get("/verify/:token", verifyToken);
route.post("/login" , login)
// route.post(validateLogin(userLoginSchema))

export default route;