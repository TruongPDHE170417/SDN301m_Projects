import { product } from "../dao/index.js";

const getAllProducts = async (req, res) => {
    try {
        const productArr = await product.getAllProducts();
        if (productArr.length == 0) {
            res.status(204).json({ statusCode: 204 });
        }
        res.status(200).json(productArr);
    } catch (err) {
        res.status(500).json({ message: `error found! ${err}` });
    }
}

const deleteProductByObjectId = async (req, res) => {
    try {
        const targetId = req.params.id;
        const target = await product.deleteProductByObjectId(targetId);
        if (target == undefined) {
            res.status(204).json({ message: "No content" });
        }
        res.status(200).json(target);
    } catch (error) {
        res.status(500).json({ message: `error found: ${error}` })
    }
}

const getProductByObjectId = async (req, res) => {
    try {
        const targetId = req.params.id;
        const target = await product.getProductByObjectId(targetId);
        if (target == null) {
            res.status(204).json({ message: "No content" });
        }
        res.status(200).json(target);
    } catch (error) {
        res.status(500).json({ message: `error found: ${error}` })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, images, comments } = req.body;
        const result = await product.createProduct({ name, price, description, category, images, comments });
        const created = await product.getProductByObjectId(result._id);
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: `Can not create a new Product. ${error.toString()}` });
    }
}

const updateProductByObjectId = async (req, res) => {
    try {
        const { name, price, description, category, images, comments } = req.body;
        const target = req.params.id;
        const result = await product.updateProductByObjectId(target, { name, price, description, category, images, comments});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Can not create a new Product. ${error}` });
    }
}
export default { getAllProducts, createProduct, getProductByObjectId, deleteProductByObjectId, updateProductByObjectId };
