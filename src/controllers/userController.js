const statusCode = require('../utils/httpStatus');
const userService = require('../services/userService');

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    if (user.message) {
      return res.status(statusCode.CONFLICT).json(user);
    }
    return res.status(statusCode.CREATED).json(user);
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params);
    if (user.message) {
      return res.status(statusCode.NOT_FOUND).json(user);
    }
    return res.status(statusCode.OK).json(user);
};

const getAllUsers = async (_req, res) => {
    const users = await userService.getAllUsers();
    return res.status(statusCode.OK).json(users);
  };

const getMyUser = async (req, res) => {
    await userService.getMyUser(req.headers);
    return res.status(statusCode.NO_CONTENT).send();
};

module.exports = { createUser, getUserById, getAllUsers, getMyUser };