//khai báo module express (với module tải thì ko cần thêm đuôi extension)
// ở bản node phải khai báo này để dùng import (type: "module")
import express, { json } from 'express';
// import 'dotenv/config';
//cách lan man hơn
import * as dotenv from 'dotenv'

//import the router
import { productRouter } from './routes/index.js'

//importDB;
import connectDB from './database.js'

dotenv.config();


//định nghĩa một web server
const app = express();
const port = process.env.PORT || 8080;

//active middleware to read the json from body
app.use(json());

//note: nếu mà define path trùng với ở file server. theo flow của code sẽ nhận cái đầu tiên.
//using productRouter
//define the URI of this route
app.use('/products', productRouter);



//phải được xử lý dựa trên cơ chế bất đồng bộ
app.listen(port, async () => {
    connectDB();
    console.log(`That server is good at http://localhost:${port}`);
})

