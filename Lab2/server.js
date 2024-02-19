// import express module
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import {CategoryRouter, ProductRouter} from './routes/index.js';
import connectDB from './database/database.js';

dotenv.config();
const app = express();
app.use(json());



app.use('/products', ProductRouter);
app.use('/categories', CategoryRouter);
app.use('/', (req, res)=>{
    res.status(404).send("Not found");
})
const port = process.env.PORT || 8080;

app.listen(port, async()=>{
    connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
});