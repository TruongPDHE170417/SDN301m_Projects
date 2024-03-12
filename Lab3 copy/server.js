// import express module
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import { CategoryRouter, ProductRouter } from './routes/index.js';
import connectDB from './database/database.js';
import createError from 'http-errors';
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



//middleware kiểm soát request không hợp lệ
//next: khi req hoặc response gặp lỗi hoặc sau khi xử lý xong cái gì đó thì sẽ vào hàm bất đồng bộ này
app.use(async (req, res, next) => {
    next(new createError.NotFound());
})

// next go here
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const port = process.env.PORT || 8080;

//listen
app.listen(port, async () => {
    connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
})
