import Comments from '../models/comment.js';
import { CommentRepo, ProductRepo } from '../repositories/index.js';
import { CommentService, ImageService, ProductService } from '../services/index.js';

// GET: /products
const getProducts = async (req, res) => {
    try {
        const productList = await ProductRepo.list()
        res.status(200).json(productList)
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
    let newComments = []
    let newImages = []
    try {
        // Get object from request body
        const { name, price, description, images, comments, category } = req.body;
        newComments = comments.length > 0 && await CommentService.addMany(comments);
        newImages = images.length > 0 && await ImageService.addMany(images);
        const newUser = await ProductService.create(name, price, description, newImages, newComments, category);
        res.status(201).json(newUser);
    } catch (error) {
        newComments.length > 0 && CommentService.deleteMany(newComments)
        newImages.length > 0 && ImageService.deleteMany(newImages)
        res.status(500).json({ message: error.toString() });
    }
}

const comment = async (req, res) => {
    let newComment;
    try {
        const productId = req.params.id;
        //comment object
        const { text, author, rate } = req.body;
        newComment = await CommentRepo.create(text, author, rate);
        const updatedProduct = await ProductService.comment(productId, newComment);
        res.status(200).json(updatedProduct);
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
        const result = await ProductService.edit(productId, { name, price, description, images, comments, category })
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
    comment,
    getProductById,
    getCommentsByProductId,
    getImagesByProductId,
    createProduct,
    editProduct,
    deleteProduct
}