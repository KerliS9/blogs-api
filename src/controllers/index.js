const express = require('express');
const rescue = require('express-rescue');

const authRouter = express.Router();
const authController = require('./authController');

authRouter.post('/', rescue(authController.userLogin));

module.exports = { authRouter };