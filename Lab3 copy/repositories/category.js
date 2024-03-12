import Categories from "../models/category.js";

const create = async ({ name, description }) => {
    try {
        const newCategory = await Categories.create({ name, description });
        return newCategory._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getAll = async () => {
    try {
        const categories = await Categories.find({}).exec();
        return (categories);
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    create,
    getAll
}