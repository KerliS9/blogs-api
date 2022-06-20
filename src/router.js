const express = require('express');
// const { authenticationMiddleware } = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const routers = express.Router();

routers.use('/login', authController);
routers.use('/user', userController);

module.exports = routers;