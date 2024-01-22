import Product from "../models/product.js";

//?Lưu ý Product đang là model của product

//* Get all
const getAllProducts = async () => {
    try {
        const listAll = await Product.find();
        return listAll;
    } catch (error) {
        throw new Error(error.toString());
    }
}

//* Get by Id
const getProductByObjectId = async (target) => {
    try {
        const result = await Product.findById(target);
        return result
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
        //check existing
        if (existingProduct == null) {
            const newProduct = await Product.create(modified);
            return newProduct;
        }
        const result = await Product.findByIdAndUpdate(targetId,modified);
        return result;
    } catch (error) {
        throw new Error(error.toString());
    }
}
//* Create a new Product
const createProduct = async ({
    name,
    price,
    description,
    category
}) => {
    try {
        //fetch product by name
        const existingProduct = await Product.findOne({ name }).exec();
        //check existing
        if (existingProduct != null) {
            throw new Error("This product is already exist")
        }
        //create product
        const newProduct = await Product.create({ name, price, description, category });

        //return
        return newProduct._doc; //* Lấy return về dưới dạng client
    } catch (err) {
        throw new Error(err.toString());
    }
}

export default {
    createProduct,
    getAllProducts,
    getProductByObjectId,
    deleteProductByObjectId,
    updateProductByObjectId
}