const express = require('express');
const rescue = require('express-rescue');

const { newUserValidation } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const authRouter = express.Router();
const userRouter = express.Router();
const authController = require('./authController');
const userController = require('./userController');

authRouter.post('/', rescue(authController.userLogin));

userRouter.post('/', newUserValidation, rescue(userController.createUser));
userRouter.use(authenticationMiddleware);
userRouter.get('/:id', rescue(userController.getUserById));
userRouter.get('/', rescue(userController.getAllUsers));
userRouter.delete('/me', rescue(userController.getMyUser));

module.exports = { authRouter, userRouter };