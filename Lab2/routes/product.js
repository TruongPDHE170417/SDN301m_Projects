import express from 'express';
import { ProductController } from '../controllers/index.js';

const productRouter = express.Router();

// GET: /products -> Get all products
productRouter.get('/', ProductController.getProducts);

// GET: /products/:id -> Get product by Id
productRouter.get('/:id', ProductController.getProductById);

// GET: /products/comments/:id
productRouter.get("/comments/:id", ProductController.getCommentsByProductId);

// POST: /products -> Create a new product
productRouter.post('/', ProductController.createProduct);

// PUT: /products/:id
productRouter.put("/:id", ProductController.editProduct);

// DELETE: /products/:id
productRouter.delete("/:id", ProductController.deleteProduct);


// GET: /products/images/:id
productRouter.get("/images/:id", ProductController.getImagesByProductId);

export default productRouter;