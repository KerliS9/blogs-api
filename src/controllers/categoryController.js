const statusCode = require('../utils/httpStatus');
const categoryService = require('../services/categoryService');

const getAllCategories = async (_req, res) => {
    const categories = await categoryService.getAllCategories();
    return res.status(statusCode.OK).json(categories);
}; 

const createCategory = async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    if (category.message) {
      return res.status(statusCode.CONFLICT).json(category);
    }
    return res.status(statusCode.CREATED).json(category);
};

module.exports = { getAllCategories, createCategory };