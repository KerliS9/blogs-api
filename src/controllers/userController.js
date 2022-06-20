const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newUserValidation } = require('../middleware/validations');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params);
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

module.exports = userRouter;