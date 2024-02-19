import mongoose, { Schema } from 'mongoose'
import Category from '../models/category.js'
const imageSchema = new Schema({
    url: {
        type: String,
        require: [true, "this field is require"],
    },
    caption: {
        type: String,
        require: [true, "this field is require"],
    }
}, {
    timestamps: true
});
const commentSchema = new Schema({
    rate: {
        type: String,
        require: [true, "this field is require"],
    },  
    text: {
        type: String,
        require: [true, "this field is require"],
    },
    author: {
        type: String,
        require: [true, "this field is require"],
    },
}, {
    timestamps: true
});
//Product schema
const productSchema = new Schema({
    //id tự gen thì ko cần
    name: {
        type: String,
        required: [true, "this field is required"],
        unique: [true, "this field must be unique"]
    },
    price: {
        type: Number,
        required: [true, "this field is required"],
        min: [0, "Price must be > 0 the default will be 0"]
    },
    description: {
        type: String,
        required: [true, "this field is required"],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: Category, //hoặc là tên của collection đã có rồi thì chỉ cần dùng "category"
        required: [true, "this field is required"],
    },
    images: [imageSchema],
    comments: [commentSchema]   
}, {
    timestamps: true,
});

//* Na ná entity class
//mapping to collection Products
const Product = mongoose.model("products", productSchema);
export default Product;

