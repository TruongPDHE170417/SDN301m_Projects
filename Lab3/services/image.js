import { ImageRepo } from "../repositories/index.js";

const addMany = async (images) => {
    try {
        const result = await ImageRepo.createMany(images);
        return result;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const editMany = async (images) =>{
    try {
        const result = []
        for(let image of images){
            result.push(await ImageRepo.edit(image));
        }
        return result;
    } catch (error) {

        throw new Error("images service: "+error.toString());
    }
}
export default {
    addMany,
    editMany
}