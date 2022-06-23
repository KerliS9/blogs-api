const express = require('express');
const rescue = require('express-rescue');

const { newUserValidation, newCategory,
  newPost, updatePost } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const authRouter = express.Router();
const authController = require('./authController');

const userRouter = express.Router();
const userController = require('./userController');

const categoryRouter = express.Router();
const categoryController = require('./categoryController');

const postRouter = express.Router();
const postController = require('./postController');

authRouter.post('/', rescue(authController.userLogin));

userRouter.post('/', newUserValidation, rescue(userController.createUser));
userRouter.use(authenticationMiddleware);
userRouter.get('/:id', rescue(userController.getUserById));
userRouter.get('/', rescue(userController.getAllUsers));
userRouter.delete('/me', rescue(userController.getMyUser));

categoryRouter.use(authenticationMiddleware);
categoryRouter.get('/', rescue(categoryController.getAllCategories));
categoryRouter.post('/', newCategory, rescue(categoryController.createCategory));

postRouter.use(authenticationMiddleware);
postRouter.get('/search', rescue(postController.getPostByContent));
postRouter.get('/:id', rescue(postController.getPostById));
postRouter.get('/', rescue(postController.getAllPost));
postRouter.post('/', newPost, rescue(postController.createPost));
postRouter.put('/:id', updatePost, rescue(postController.updatePostById));
postRouter.delete('/:id', rescue(postController.deletePostById));

module.exports = { authRouter, userRouter, categoryRouter, postRouter };