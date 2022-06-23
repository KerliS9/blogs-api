const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

const routers = express.Router();

routers.use('/login', authController);
routers.use('/user', userController);
routers.use('/categories', categoryController);
routers.use('/post', postController);

module.exports = routers;