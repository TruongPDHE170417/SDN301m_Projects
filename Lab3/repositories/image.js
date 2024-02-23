import { Schema, Types } from "mongoose";
import Images from "../models/image.js";

const create = async (url, caption, name) => {
    try {
        const newComment = await Images.create({ url, caption, name });
        return newComment._doc;
    } catch (e) {
        throw new Error(e.toString());
    }
}

const createMany = async (images) => {
    try {
        const result = await Images.insertMany(images);
        return result;
    } catch (error) {

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

const edit = async (image) => {
    try {
        return await Images.findByIdAndUpdate({ _id: new Types.ObjectId(image._id) }, image, { new: true });
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    getById,
    create,
    createMany,
    drop,
    dropMany,
    edit
}