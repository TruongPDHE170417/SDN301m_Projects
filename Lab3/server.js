// import express module
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import {CategoryRouter, ProductRouter} from './routes/index.js';
import connectDB from './database/database.js';
//environment
dotenv.config();
//calling app
const app = express();
app.use(json());

//cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use('/products', ProductRouter);
app.use('/categories', CategoryRouter);
app.use('/', (req, res)=>{
    res.status(404).send("Not found");
})

const port = process.env.PORT || 8080;

//listen
app.listen(port, async()=>{
    connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
});