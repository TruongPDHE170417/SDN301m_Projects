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
        const result = await Product.findById(target).populate('category');
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
        console.log(err);
        throw err;
    }
}

// Express 4.x

// To get a URL parameter's value, use req.params

// app.get('/p/:tagId', function(req, res) {
//   res.send("tagId is set to " + req.params.tagId);
// });

// // GET /p/5
// // tagId is set to 5
// If you want to get a query parameter ?tagId=5, then use req.query

// app.get('/p', function(req, res) {
//   res.send("tagId is set to " + req.query.tagId);
// });

// // GET /p?tagId=5
// // tagId is set to 5

export default {
    createProduct,
    getAllProducts,
    getProductByObjectId,
    deleteProductByObjectId,
    updateProductByObjectId
}

// Dear programmer
// When I wrote this code, only god and I knew how it worked
// Now, only god knows it

// Therefore, If you are trying to optimize or fix my code
// and fail (most surely). 
// Please don't ask me for help, I have no idea what I wrote either.
// feel free to add your searched solution link under this section.
// https://youtu.be/QwLvrnlfdNo?si=GTC-qTI53EKJCrlhD