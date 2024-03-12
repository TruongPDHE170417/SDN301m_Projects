import { ImageRepo } from "../repositories/index.js";

const addMany = async (images) => {
    try {
        const result = await ImageRepo.createMany(images);
        return result;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const editMany = async (images) => {
    try {
        const result = []
        for (let image of images) {
            result.push(await ImageRepo.edit(image));
        }
        return result;
    } catch (error) {

        throw new Error("images service: " + error.toString());
    }
}

const deleteMany = async (images) => {
    try {
       const result = await ImageRepo.dropMany(images);
       return result;
    } catch (error) {
        console.log('at service deleteMany ')
        throw new Error(error.toString());
    }
}
export default {
    addMany,
    editMany,
    deleteMany
}