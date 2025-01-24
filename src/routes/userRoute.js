import express from 'express';

import {register} from "../controller/userController.js"
import { verifyToken } from '../middleware/verification.js';

const route = express.Router();

route.post("/create", register);
route.get("/verify/:token" , verifyToken);

export default route;