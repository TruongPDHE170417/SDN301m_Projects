import { productDAO } from "../dao/index.js";

const getAllProducts = async (req, res) => {
    try {
        const productArr = await productDAO.getAllProducts();
        if (productArr.length == 0) {
            res.status(204).json({ statusCode: 204 });
        }
        res.status(200).json({ statusCode: 200, data: productArr });
    } catch (err) {
        res.status(500).json({ message: `error found! ${err}` });
    }
}

const getProductByObjectId = async (req, res) => {
    try {
        const targetId = req.params.id;
        const target = await productDAO.getProductByObjectId(targetId);
        if(target == undefined){
            res.status(204).json({ message: "No content" });
        }
        res.status(200).json(target);
    } catch (error) {
        res.status(500).json({message:`error found: ${error}`})
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const result = await productDAO.createProduct({ name, price, description, category });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: `Can not create a new Product. ${error}` });
    }
}
export default { getAllProducts, createProduct, getProductByObjectId };
