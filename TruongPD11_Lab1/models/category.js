import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    //id tự gen thì ko cần
    name: {
        type: String,
        required: [true, "this field is required"], //?Model Validation
        unique: [true, "this field must be unique"]
    },
    description: {
        type: String,
        required: [true, "this field is required"],
    }

}, {
    timestamps: true //display initial time
});

//Mapping
const Category = mongoose.model("Category", categorySchema);
export default Category;