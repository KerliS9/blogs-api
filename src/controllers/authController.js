const statusCode = require('../utils/httpStatus');

const authService = require('../services/authService');

const userLogin = async (req, res) => {
    const token = await authService.userLogin(req.body);
    if (token.message) {
      return res.status(statusCode.BAD_REQUEST).json(token);
    }
    res.status(statusCode.OK).json(token);
};

module.exports = { userLogin };