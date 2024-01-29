import express from 'express';
import { categoryController } from '../controllers/index.js';
//khai bao doi tuong router
const categoryRouter = express.Router();

//route paths based on URI
categoryRouter
    .get('/:id', (req, res) => {
        return categoryController.getByObjectId(req, res);
    })
    .delete('/:id', (req, res) => {
        return categoryController.deleteByObjectId(req, res);
    })
    .get('/', (req, res) => {
        //có thể không cần add tham số nếu như dùng cả
        return categoryController.getAll(req, res);
    })
    .post('/', (req, res) => {
        res.set('Content-Type', 'application/json; charset=utf-8')
        return categoryController.create(req, res);
    })
    .put('/:id', (req, res) => {
        res.set('Content-Type', 'application/json; charset=utf-8')
        return categoryController.updateByObjectId(req, res);
    })
export default categoryRouter;