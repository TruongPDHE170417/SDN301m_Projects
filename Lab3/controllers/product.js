import { ProductRepo } from '../repositories/index.js';
import { CommentService, ImageService, ProductService } from '../services/index.js';

// GET: /products
const getProducts = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.list())
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// GET: /products/1
const getProductById = async (req, res) => {
    try {
        res.status(200).json(await ProductRepo.getById(req.params.id))
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// GET: /products/comments/:id
const getCommentsByProductId = async (req, res) => {
    try {
        const result = await ProductService.getComments(req.params.id)
        result.length > 0 ?
            res.status(200).json(await ProductService.getComments(req.params.id)) :
            res.status(204).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}
// GET: /products/images/:id
const getImagesByProductId = async (req, res) => {
    try {
        const result = await ProductService.getImages(req.params.id)
        result.length > 0 ?
            res.status(200).json(await ProductService.getImages(req.params.id)) :
            res.status(204).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

// POST: /products
const createProduct = async (req, res) => {
    try {
        // Get object from request body
        const { name, price, description, images, comments, category } = req.body;
        const newComments = await CommentService.addMany(comments);
        const newImages = await ImageService.addMany(images);
        const newUser = await ProductService.create(name, price, description, newImages, newComments, category);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
}

// PUT: /products/1
const editProduct = async (req, res) => {
    try {
        // Get object from request body
        const { name, price, description, images, comments, category } = req.body;
        const productId = req.params.id; 
        const updatedImage = await ImageService.editMany(images);
        const updateComment = await CommentService.editMany(comments);
        const result = await ProductService.edit(productId,{ name, price, description, images, comments, category })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

// DELETE: /products/1
const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await ProductService.deleteProduct(req.params.id);
        res.status(200).json(deleteProduct);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

export default {
    getProducts,
    getProductById,
    getCommentsByProductId,
    getImagesByProductId,
    createProduct,
    editProduct,
    deleteProduct
}