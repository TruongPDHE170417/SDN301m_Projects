import mongoose, { Schema } from 'mongoose'
import Products from './product.js';

const imageSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId, 
        ref: "products.images"
    },
    "url": {
        type: String
    },
    "caption": {
        type: String
    },
    "name": {
        type: String
    }
},
    {
        timestamps: true,
    }
);
const Images = mongoose.model("images", imageSchema);
export default Images;