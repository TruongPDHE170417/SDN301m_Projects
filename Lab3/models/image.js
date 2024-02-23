import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
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