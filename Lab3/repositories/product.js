import Products from "../models/product.js";

const create = async (name, price, description, imagesL, commentsL, category) => {
    try {
        // convert images id to string
        const images = imagesL.length > 0 ? await Promise.all((imagesL ?? []).map(async (img) => {
            img._id = img._id.toString();
            delete img.name;
            return img;
        })) : [];

        const comments = commentsL.length > 0 ? await Promise.all((commentsL ?? []).map(async (cmt) => {
            cmt._id = cmt._id.toString();
            delete cmt.rate;
            return cmt;
        })) : [];

        // Create new product
        const newProduct = await Products.create({
            name,
            price,
            description,
            images,
            comments,
            category
        }).then(result => result.populate("category"));
        return newProduct._doc;

    } catch (error) {
        throw new Error(error.toString());
    }
};

// Get all
const list = async () => {
    try {
        return await Products.find({}).populate('category').exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}


// Get single Product by Id
const getById = async (id) => {
    try {
        return await Products.findOne({ _id: id }).populate("category").exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

const edit = async (id, { name, price, description, images, comments, category }) => {
    try {
        return await Products.findByIdAndUpdate({ _id: id }, { $set: { name, price, description, images, comments, category } }, { new: true }).populate("category").exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

const deleteProduct = async (id) => {
    try {
        return await Products.findByIdAndDelete({ _id: id });
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    create,
    list,
    getById,
    edit,
    deleteProduct
}