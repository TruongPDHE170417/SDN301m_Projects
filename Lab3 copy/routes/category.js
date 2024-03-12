import express from 'express';
import { CategoryController } from '../controllers/index.js';

const CategoryRouter = express.Router();

// POST: /categories -> Create a new product
CategoryRouter.post('/', CategoryController.createCategory);

//GET: /categories -> Get All
CategoryRouter.get('/', CategoryController.getAll);

export default CategoryRouter;