const express = require('express');
const route = require('./controllers/index');
// const userController = require('./controllers/userController');
// const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

const routers = express.Router();

routers.use('/login', route.authRouter);
routers.use('/user', route.userRouter);
routers.use('/categories', route.categoryRouter);
routers.use('/post', postController);

module.exports = routers;