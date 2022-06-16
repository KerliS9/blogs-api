const express = require('express');

const authRouter = express.Router();
const authService = require('../services/authenticationService');

authRouter.post('/', async (req, res, next) => {
  try {
    const token = await authService.authentication(req.body);
    res.status(200).json(token);
  } catch (e) {
    console.log('controllers auth', e);
  }
  next();
});

module.exports = authRouter;