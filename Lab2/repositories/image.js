import { Types } from "mongoose";
import Images from "../models/image.js";

const create = async (_id, url, caption, name) => {
    try {
        const temp = new Types.ObjectId(_id);
        _id = temp;
        const newComment = await Images.create({ _id, url, caption, name });
        return newComment._doc;
    } catch (e) {
        throw new Error(e.toString());
    }
}
const drop = async (id) => {
    try {
        return await Images.findByIdAndDelete({ _id: id });
    } catch (error) {
        throw new Error(error.toString());
    }
}
const dropMany = async (target) => {
    try {
        return await Images.deleteMany(target);
    } catch (error) {
        throw new Error(error.toString());
    }
}
const getById = async (id) => {
    try {
        return await Images.findOne({ _id: id }).exec();
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