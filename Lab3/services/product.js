import { Types } from 'mongoose';
import { ProductRepo, CommentRepo, ImageRepo } from '../repositories/index.js';

// // GET: /products
// const getProducts = async (req, res) => {
//     try {
//         res.status(200).json(await ProductRepo.list())
//     } catch (error) {
//         res.status(500).json({
//             message: error.toString()
//         })
//     }
// }

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
const create = async ({ name, price, description, images, comments, category }) => {
    try {
        const newUser = await ProductRepo.create({ name, price, description, images, comments, category });
        if (newUser.comments.length > 0) {
            newUser.comments.forEach(comment => {
                const id = new Types.ObjectId(comment._id);
                CommentRepo.create(id, comment.text, comment.author);
            });
        }
        if (newUser.images.length > 0) {
            newUser.images.forEach(image => {
                const id = new Types.ObjectId(image._id);
                ImageRepo.create(id, image.url, image.caption);
            });
        }
        return newUser;
    } catch (e) {
        throw new Error(e.toString());
    }
}

// // PUT: /products/1
// const editProduct = async (req, res) => {
//     try {
//         res.status(200).json(await ProductRepo.edit(req.params.id, req.body));
//     } catch (error) {
//         res.status(500).json({
//             error: error.toString()
//         });
//     }
// }

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
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    // getProducts,
    // getProductById,
    getImages,
    getComments,
    create,
    // editProduct,
    deleteProduct
}