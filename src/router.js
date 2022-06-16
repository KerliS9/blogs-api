const express = require('express');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const authController = require('./controllers/authenticationController');

const routers = express.Router();

routers.use('/login', authenticationMiddleware, authController);

module.exports = routers;