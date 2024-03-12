import Products from '../models/product.js';
import { ProductRepo, CommentRepo, ImageRepo } from '../repositories/index.js';

// GET: /products/comments/:id
const getComments = async (productId) => {
    try {
        const product = await ProductRepo.getById(productId);
        const commentList = product.comments;
        const commentDetails = [];
        //forEach does not wait for async call
        if (commentList) {
            for (let comment of commentList) {
                const detail = await CommentRepo.getById(comment._id)
                commentDetails.push(detail);
            }
        }
        return commentDetails

    } catch (error) {
        throw new Error(error);
    }
}

// GET: /products/images/:id
const getImages = async (productId) => {
    try {
        const product = await ProductRepo.getById(productId);
        const imageList = product.images;
        const imageDetails = [];
        //forEach does not wait for async call
        if (imageList) {
            for (let img of imageList) {
                const detail = await ImageRepo.getById(img._id)
                imageDetails.push(detail);
            }
        }
        return imageDetails
    } catch (error) {
        throw new Error(error);
    }
}

// POST: /products
const create = async (name, price, description, images, comments, category) => {
    try {
        const newUser = await ProductRepo.create(name, price, description, images, comments, category);
        return newUser;
    } catch (e) {
        throw new Error(e.toString());
    }
}

const comment = async (productId, newComment) => {
    try {
        const product = await ProductRepo.getById(productId);
        const newCommentInfo = {
            _id: newComment._id.toString(),
            author: newComment.author,
            text: newComment.text,
        }
        product.comments.push(newCommentInfo);
        const newProduct = await Products.findByIdAndUpdate({ _id: product._id }, product).populate('category').exec();
        return newProduct
    } catch (error) {
        throw new Error(e.toString());
    }
}

// PUT: /products/1
const edit = async (productId, body) => {
    try {
        const updatedProduct = await ProductRepo.edit(productId, body);
        return updatedProduct;
    } catch (error) {
        throw new Error(error.toString());
    }
}

// DELETE: /products/:id
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await ProductRepo.deleteProduct(id);
        const deleteComment = deletedProduct.comments;
        const deleteImage = deletedProduct.images;
        deleteComment?.forEach(comment => {
            CommentRepo.drop(comment._id);
        })
        deleteImage?.forEach(image => {
            ImageRepo.drop(image._id);
        })
        return deleteProduct;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    getImages,
    getComments,
    comment,
    create,
    edit,
    deleteProduct
}