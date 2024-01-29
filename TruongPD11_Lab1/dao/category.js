import Category from "../models/category.js";

const getAll = async () => {
    try {
        const listAll = await Category.find();
        return listAll;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getByObjectId = async (target) => {
    try {
        const result = await Category.findById(target);
        return result
    } catch (error) {
        return undefined
    }
}

const deleteByObjectId = async (target) => {
    try {
        const result = await Category.findByIdAndDelete(target);
        return result
    } catch (error) {
        return undefined
    }
}

const updateByObjectId = async (targetId, modified) => {
    try {
        const existingProduct = await Category.findById(targetId);
        //check existing
        if (existingProduct == null) {
            const newProduct = await Category.create(modified);
            return newProduct;
        }
        const result = await Category.findByIdAndUpdate(targetId,modified);
        return result;
    } catch (error) {
        throw new Error(error.toString());
    }
}
const create = async ({
    name,
    description,
}) => {
    try {
        //fetch product by name
        const existingProduct = await Category.findOne({ name }).exec();
        //check existing
        if (existingProduct != null) {
            throw new Error("This product is already exist")
        }
        //create product
        const newProduct = await Category.create({ name, description });

        //return
        return newProduct._doc; //* Lấy return về dưới dạng client
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default {
    create,
    getAll,
    getByObjectId,
    deleteByObjectId,
    updateByObjectId
}