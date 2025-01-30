import express from 'express';

import { decodeToken } from '../middleware/decodeToken.js';
import { createNote, updateNote, deleteNote, getAllNote, searchNote, sortNote_title, paginationNote } from '../controller/noteController.js';



const notesRoute = express.Router();

notesRoute.post("/createNote" , decodeToken , createNote);
notesRoute.delete("/deleteNote" , decodeToken , deleteNote);
notesRoute.post("/updateNote" , decodeToken , updateNote);
notesRoute.get("/getAllNote" , decodeToken , getAllNote);
notesRoute.post("/searchNote" , decodeToken , searchNote);
notesRoute.get("/sortNote_title" , decodeToken , sortNote_title);
notesRoute.get("/paginationNote" , decodeToken , paginationNote);

export default notesRoute;