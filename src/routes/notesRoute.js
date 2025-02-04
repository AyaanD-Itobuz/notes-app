import express from 'express';

import { decodeToken } from '../middleware/decodeToken.js';
import { createNote, updateNote, deleteNote, getAllNote, searchNote, sortNote_title, paginationNote, fileUpload, upload } from '../controller/noteController.js';
import { generateAccessToken, verifyRefreshToken } from '../middleware/refreshToken.js';



const notesRoute = express.Router();

notesRoute.post("/createNote" , decodeToken , createNote);
notesRoute.delete("/deleteNote" , decodeToken , deleteNote);
notesRoute.post("/updateNote" , decodeToken , updateNote);
notesRoute.get("/getAllNote" , decodeToken , getAllNote);
notesRoute.post("/searchNote" , decodeToken , searchNote);
notesRoute.get("/sortNote_title" , decodeToken , sortNote_title);
notesRoute.get("/paginationNote" , decodeToken , paginationNote);
notesRoute.get("/getAccessToken" , verifyRefreshToken , generateAccessToken);
notesRoute.post("/uploadFile/:id" , decodeToken ,upload.single("myFile"), fileUpload);

export default notesRoute;