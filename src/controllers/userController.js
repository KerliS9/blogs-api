const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newUserValidation } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.post('/', newUserValidation, async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    // console.log('create controllers', user);
    if (user.message) {
      return res.status(statusCode.CONFLICT).json(user);
    }
    return res.status(statusCode.CREATED).json(user);
  } catch (e) {
    next(e);
  }
});

userRouter.use(authenticationMiddleware);
userRouter.get('/:id', async (req, res, next) => {
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

userRouter.get('/', async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(statusCode.OK).json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = userRouter;