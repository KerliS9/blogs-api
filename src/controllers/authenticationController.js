const express = require('express');

const authRouter = express.Router();
const authService = require('../services/authenticationService');

authRouter.post('/', async (req, res, _next) => {
    const token = await authService.authentication(req.body);
    res.status(200).json(token);
});

module.exports = authRouter;