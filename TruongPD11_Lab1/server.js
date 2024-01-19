import express from 'express';
import tutorialRouter from './routes/tutorialRoute.js';
const app = express();
const port = 9999;
app.use(express.json());
app.use("/tutorials",tutorialRouter)
app.all("*",(req,res)=>{
    res.status(404).json({message:"path not found"})
})
//listen
app.listen(port,async()=>{
    console.log("Server on at "+port);
})