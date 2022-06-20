const express = require('express');
const statusCode = require('../utils/httpStatus');

const authRouter = express.Router();
const authService = require('../services/authService');

authRouter.post('/', async (req, res, next) => {
  try {
    const token = await authService.authentication(req.body);
    if (token.message) {
      return res.status(statusCode.BAD_REQUEST).json(token);
    }
    res.status(statusCode.OK).json(token);
  } catch (e) {
    next(e);
  }
});

module.exports = authRouter;