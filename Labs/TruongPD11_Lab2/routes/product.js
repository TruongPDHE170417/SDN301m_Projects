import express from 'express';
import { productController } from '../controllers/index.js';
const productRouter = express.Router();

productRouter
    .get('/:id', (req, res) => {
        return productController.getProductByObjectId(req, res);
    })
    .delete('/:id', (req, res) => {
        return productController.deleteProductByObjectId(req, res);
    })
    .get('/', (req, res) => {
        return productController.getAllProducts(req, res);
    })
    .post('/', (req, res) => {
        return productController.createProduct(req, res);
    })
    .put('/:id', (req, res) => {
        return productController.updateProductByObjectId(req, res);
    })
export default productRouter;