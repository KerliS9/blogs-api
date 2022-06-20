const { User } = require('../database/models');
// const statusCode = require('../utils/httpStatus');

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
  };

const getUserById = async ({ id }) => {
  const user = await User.findOne({ where: { id } });
  if (!user) return { message: 'User does not exist' };
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
};