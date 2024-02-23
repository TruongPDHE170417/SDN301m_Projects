import { CommentRepo } from "../repositories/index.js";

const addMany = async (comments) => {
    try {
        console.log("service")
        const result = await CommentRepo.createMany(comments);
        console.log(result);
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
export default {
    addMany,
    editMany
}