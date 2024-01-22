import Product from "../models/product.js";

//?Lưu ý Product đang là model của product

//* Get all
const getAllProducts = async () =>{
    try {
        const listAll = await Product.find();
        return listAll;
    } catch (error) {
        throw new Error(error.toString());
    }
}

//* Get by Id
const getProductByObjectId = async (target) =>{
    try{
        const result = await Product.findById(target);
        console.log("Find by Id")
        return result
    }catch(error){
        return undefined
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
    getProductByObjectId
}