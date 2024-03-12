import { CommentRepo } from "../repositories/index.js";

const addMany = async (comments) => {
    try {
        const result = await CommentRepo.createMany(comments);
        return result
    } catch (error) {
        throw new Error(`at comment service: ${error.toString()}`);
    }
}

const editMany = async (comments) => {
    try {
        const result = []
        for (let comment of comments) {

            result.push(await CommentRepo.edit(comment));
        }
        return result;
    } catch (error) {
        throw new Error("comment service: " + error.toString());
    }
}

const deleteMany = async (comments) => {
    try {
        const result = await CommentRepo.dropMany(comments);
        return result;
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    addMany,
    editMany,
    deleteMany
}