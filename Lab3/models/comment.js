import mongoose, { Schema } from "mongoose"
const commentSchema = new Schema({
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