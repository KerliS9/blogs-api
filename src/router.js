const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');

const routers = express.Router();

routers.use('/login', authMiddleware, authController);

module.exports = routers;