import { Schema, Types } from "mongoose";
import Comments from "../models/comment.js";

const create = async (text, author, rate) => {
    try {
        const newComment = await Comments.create({ text, author, rate });
        return newComment._doc;
    } catch (e) {
        throw new Error(e.toString());
    }
}
const createMany = async (comments) => {
    try {
        const result = await Comments.insertMany(comments);
        return result
    } catch (error) {
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
const getById = async (id) => {
    try {
        return await Comments.findOne({ _id: id }).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

const edit = async ({ _id, text, author, rate }) => {
    try {
        return await Comments.findByIdAndUpdate({ _id: new Types.ObjectId(_id) }, { text, author, rate }, { new: true });
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    getById,
    create,
    createMany,
    edit,
    drop,
    dropMany
}