
import express, { json } from 'express';

import * as dotenv from 'dotenv'

import { productRouter } from './routes/index.js'

import connectDB from './database.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(json());
app.use('/products', productRouter);
app.use('*', (req, res) => {
    res.status(404);
    res.json({ message: "path invalid" });
})



app.listen(port, async () => {
    connectDB();
    console.log(`That server is good at http://localhost:${port}`);
})

