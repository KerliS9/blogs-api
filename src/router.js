const express = require('express');
const authMiddleware = require('./middleware/authenticationMiddleware');
const authController = require('./controllers/authenticationController');

const routers = express.Router();

routers.use('/login', authMiddleware, authController);

module.exports = routers;