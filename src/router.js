const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const routers = express.Router();

routers.use('/login', authMiddleware, authController);
routers.use('/user', userController);

module.exports = routers;