const express = require('express');
const rescue = require('express-rescue');
const statusCode = require('../utils/httpStatus');

const authRouter = express.Router();
const authService = require('../services/authService');

authRouter.post('/', rescue(async (req, res) => {
    const token = await authService.authentication(req.body);
    if (token.message) {
      return res.status(statusCode.BAD_REQUEST).json(token);
    }
    res.status(statusCode.OK).json(token);
}));

module.exports = authRouter;