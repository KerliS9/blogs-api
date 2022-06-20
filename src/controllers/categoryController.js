const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newCategory } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const categoryRouter = express.Router();
const categoryService = require('../services/categoryService');

/* userRouter.get('/:id', authenticationMiddleware, async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params);
    if (user.message) {
      return res.status(statusCode.NOT_FOUND).json(user);
    }
    return res.status(statusCode.OK).json(user);
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', authenticationMiddleware, async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(statusCode.OK).json(users);
  } catch (e) {
    next(e);
  }
}); */

categoryRouter.post('/', authenticationMiddleware, newCategory, async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    // console.log('create controllers', category);
    if (category.message) {
      return res.status(statusCode.CONFLICT).json(category);
    }
    return res.status(statusCode.CREATED).json(category);
  } catch (e) {
    next(e);
  }
});

module.exports = categoryRouter;