const express = require('express');
const statusCode = require('../utils/httpStatus');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params);
    return res.status(statusCode.OK).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(statusCode.NOT_FOUND).json({ message: 'Algo deu errado' });
  }
});

userRouter.get('/', async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(statusCode.OK).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(statusCode.NOT_FOUND).json({ message: 'Algo deu errado' });
  }
});

module.exports = userRouter;