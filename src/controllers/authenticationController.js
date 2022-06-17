const express = require('express');
const statusCode = require('../utils/httpStatus');

const authRouter = express.Router();
const authService = require('../services/authenticationService');

authRouter.post('/', async (req, res, _next) => {
  // try {
    const token = await authService.authentication(req.body);
    console.log('controllers token', token);
    if (token.message) {
      return res.status(token.status).json(token.message);
    }
    res.status(statusCode.OK).json(token);
  /* } catch (e) {
    console.log('controllers auth', e);
    next(e);
  } */
});

module.exports = authRouter;