const express = require('express');
const statusCode = require('../utils/httpStatus');

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

module.exports = userRouter;