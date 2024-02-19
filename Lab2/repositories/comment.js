import mongoose, { Types } from "mongoose";
import Comments from "../models/comment.js";

const create = async (_id, text, author, rate) => {
    try {
        const temp = new Types.ObjectId(_id);
        _id = temp;
        const newComment = await Comments.create({ _id, text, author, rate });
        return newComment._doc;
    } catch (e) {
        throw new Error(e.toString());
    }
}
const drop = async (id) => {
    try {
        return await Comments.findByIdAndDelete({ _id: id });
    } catch (error) {
        throw new Error(error.toString());
    }
}

const dropMany = async (target) => {
    try {
        return await Comments.deleteMany(target);
    } catch (error) {
        throw new Error(error.toString());
    }
}
const getById = async(id)=>{
    try {
        return await Comments.findOne({_id: id}).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    getById,
    create,
    drop,
    dropMany
}