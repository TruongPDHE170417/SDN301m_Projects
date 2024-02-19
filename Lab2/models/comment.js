import mongoose, { Schema } from "mongoose"
import Products from './product.js';
const commentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "products.comments"
    },
    "text": {
        type: String
    },
    "author": {
        type: String,
    },
    "rate": {
        type: Number,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

const Comments = mongoose.model("comments", commentSchema);
export default Comments