import express from "express"; //importing express
import { createStudents, getStudents } from "../controllers/studentController.js" //importing the controllers


const studentRouter = express.Router(); //creating a router

studentRouter.get("/", getStudents) //get request

studentRouter.post("/", createStudents) //post request

export default studentRouter //exporting the router