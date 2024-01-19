import express from 'express';
import { getAll,findByTitle,addNewTutorial } from '../controllers/tutorialController.js';
const tutorialRouter = express.Router();

tutorialRouter
.get("",(req,res)=>{
    getAll(req,res);
})
.get("/:title",(req,res)=>{
    const title = req.params.title
    findByTitle(req,res,title)
})
.post("", (req,res)=>{
    const newRecord = req.body
    addNewTutorial(req,res,newRecord);
})
export default tutorialRouter