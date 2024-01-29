import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        require: [true, "this field is require"],
        unique: [true, "this field must be unique"]
    },
    description: {
        type: String,
        require: [true, "this field is require"],
        unique: [true, "this field must be unique"]
    }
}, {
    timestamps: true
});

const Category = mongoose.model("category",categorySchema);
export default Category   