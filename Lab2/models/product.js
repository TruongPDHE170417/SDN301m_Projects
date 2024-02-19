import mongoose, { Schema } from "mongoose";
// Product object schema
const childImageSchema = new Schema({
    "url": {
        type: String,
        trim: true
    },
    "caption": {
        type: String,
        trim: true
    }
}, {
    timestamps: false
})

const childCommentSchema = new Schema({
    "text": {
        type: String,
    },
    "author": {
        type: String
    }
}, {
    timestamps: false
})

const productSchema = new Schema({
    "name": {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name is unique value']
    },
    "price": {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Price must be a number and greater than or equal zero");
        }
    },
    "description": {
        type: String,
        required: true
    },
    "images": [childImageSchema],
    "comments": [childCommentSchema],
    "category": {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
}, {
    timestamps: true
});

const Products = mongoose.model("products", productSchema);

// Export model
export default Products;
