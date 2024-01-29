import Product from "../models/product.js";

//* Get all
const getAllProducts = async () => {
    try {
        const listAll = await Product.find().populate('category').exec();
        return listAll;
    } catch (error) {
        throw new Error(error.toString());
    }
}

//* Get by Id
const getProductByObjectId = async (target) => {
    try {
        const result = await Product.findById(target).populate('category').exec();
        return result;
    } catch (error) {
        return undefined
    }
}

//* Delete by Id
const deleteProductByObjectId = async (target) => {
    try {
        const result = await Product.findByIdAndDelete(target);
        return result
    } catch (error) {
        return undefined
    }
}
//*Update
const updateProductByObjectId = async (targetId, modified) => {
    try {
        const existingProduct = await Product.findById(targetId);
        if (existingProduct == null) {
            const newProduct = await Product.create(modified);
            return newProduct;
        }
        const result = await Product.findByIdAndUpdate(targetId, modified);
        const resultAdd = await Product.findById(targetId);
        return resultAdd;
    } catch (error) {
        throw new Error(error.toString());
    }
}
//* Create a new Products
const createProduct = async ({
    name,
    price,
    description,
    category,
    images,
    comments

}) => {
    try {
        const existingProduct = await Product.findOne({ name }).exec();
        if (existingProduct != null) {
            throw new Error("This product is already exist")
        }
        const newProduct = await Product.create({
            name, price, description, category, images, comments
        });

        return newProduct._doc;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default {
    createProduct,
    getAllProducts,
    getProductByObjectId,
    deleteProductByObjectId,
    updateProductByObjectId
}