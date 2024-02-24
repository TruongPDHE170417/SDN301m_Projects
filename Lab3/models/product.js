import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    "name": {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
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
    "images": [{
        _id: {
            type: String
        },
        url: {
            type: String
        },
        caption: {
            type: String
        }
    }],
    "comments": [{
        _id: {
            type: String
        },
        text: {
            type: String
        },
        author: {
            type: String
        }
    }],
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
