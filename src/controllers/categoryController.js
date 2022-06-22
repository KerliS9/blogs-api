const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newCategory } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const categoryRouter = express.Router();
const categoryService = require('../services/categoryService');

categoryRouter.use(authenticationMiddleware);
categoryRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(statusCode.OK).json(categories);
  } catch (e) {
    next(e);
  }
}); 

categoryRouter.post('/', newCategory, async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    if (category.message) {
      return res.status(statusCode.CONFLICT).json(category);
    }
    return res.status(statusCode.CREATED).json(category);
  } catch (e) {
    next(e);
  }
});

module.exports = categoryRouter;