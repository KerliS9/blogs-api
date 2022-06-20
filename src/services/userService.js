const { User } = require('../database/models');
// const statusCode = require('../utils/httpStatus');

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
  };

const getUserById = async ({ id }) => {
  const users = await User.findOne({ where: { id } });
  return users;
};

module.exports = {
  getAllUsers,
  getUserById,
};