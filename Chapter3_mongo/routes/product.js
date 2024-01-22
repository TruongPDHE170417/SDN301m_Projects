import express from 'express';
import { productController } from '../controllers/index.js';

//khai bao doi tuong router
const productRouter = express.Router();

//route paths based on URI
productRouter
    .get('/:id', (req, res) => {
        return productController.getProductByObjectId(req, res);
    })
    .get('/', (req, res) => {
        //có thể không cần add tham số nếu như dùng cả
        return productController.getAllProducts(req, res);
    })
    .post('/', (req, res) => {
        return productController.createProduct(req, res);
    })

export default productRouter;