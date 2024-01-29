import { categoryDAO } from "../dao/index.js";

const getAll = async (req, res) => {
    try {
        const productArr = await categoryDAO.getAll();
        if (productArr.length == 0) {
            res.status(204).json({ statusCode: 204 });
        }
        res.status(200).json({ statusCode: 200, data: productArr });
    } catch (err) {
        res.status(500).json({ message: `error found! ${err}` });
    }
}

const deleteByObjectId = async (req, res) => {
    try {
        const targetId = req.params.id;
        const target = await categoryDAO.deleteByObjectId(targetId);
        if (target == undefined) {
            res.status(204).json({ message: "No content" });
        }
        res.status(200).json(target);
    } catch (error) {
        res.status(500).json({ message: `error found: ${error}` })
    }
}

const getByObjectId = async (req, res) => {
    try {
        const targetId = req.params.id;
        const target = await categoryDAO.getByObjectId(targetId);
        if (target == null) {
            res.status(204).json({ message: "No content" });
        }
        res.status(200).json(target);
    } catch (error) {
        res.status(500).json({ message: `error found: ${error}` })
    }
}

const create = async (req, res) => {
    try {
        const { name, description } = req.body;
        const result = await categoryDAO.create({ name, description });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: `Can not create a new Category. ${error.toString()}` });
    }
}

const updateByObjectId = async (req, res) => {
    try {
        const { name, description } = req.body;
        const target = req.params.id;
        const result = await categoryDAO.updateByObjectId(target, { name, description });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Can not update a new Category. ${error}` });
    }
}
export default { getAll, create, getByObjectId, deleteByObjectId, updateByObjectId};
