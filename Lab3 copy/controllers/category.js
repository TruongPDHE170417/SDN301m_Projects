import { CategoryRepo } from "../repositories/index.js";

// POST: /categories
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        res.status(201).json(await CategoryRepo.create({ name, description }));
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getAll = async (req, res) => {
    try {
        res.status(200).json(await CategoryRepo.getAll());
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default {
    createCategory,
    getAll
}