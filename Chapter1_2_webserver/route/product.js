import express from 'express';
import getAllProducts from '../controllers/productController.js';

//khai bao doi tuong router
const productRouter = express.Router();

//route paths based on URI
productRouter.get('/', (req, res) => {
    getAllProducts; //có thể không cần add tham số nếu như dùng cả
})//viết tắt của productRouter.post
    .get('/:id', (req, res) => {
        const id = req.params.id;
        res.send(`<h1>Id:${id}</h1>`);
    })

export default productRouter;