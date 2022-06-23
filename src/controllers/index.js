const express = require('express');
const rescue = require('express-rescue');

const { newUserValidation, newCategory } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const authRouter = express.Router();
const authController = require('./authController');

const userRouter = express.Router();
const userController = require('./userController');

const categoryRouter = express.Router();
const categoryController = require('./categoryController');

authRouter.post('/', rescue(authController.userLogin));

userRouter.post('/', newUserValidation, rescue(userController.createUser));
userRouter.use(authenticationMiddleware);
userRouter.get('/:id', rescue(userController.getUserById));
userRouter.get('/', rescue(userController.getAllUsers));
userRouter.delete('/me', rescue(userController.getMyUser));

categoryRouter.use(authenticationMiddleware);
categoryRouter.get('/', rescue(categoryController.getAllCategories));
categoryRouter.post('/', newCategory, rescue(categoryController.createCategory));

module.exports = { authRouter, userRouter, categoryRouter };