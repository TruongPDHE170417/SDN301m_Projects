import mongoose, { Schema } from 'mongoose'

//Product schema
const productSchema = new Schema({
    //id tự gen thì ko cần
    name: {
        type: String,
        required: [true, "this field is required"], //?Model Validation
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
        type: String,
        required: [true, "this field is required"],
    }
},{
    timestamps:true //display initial time
});

//Mapping
//* Na ná entity class
const Product = mongoose.model("Products",productSchema);
export default Product;