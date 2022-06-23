const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/generateTokenJWT');

const getAllUsers = async () => User.findAll({
      attributes: { exclude: ['password'] },
    });

const getUserById = async ({ id }) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });
  if (!user) return { message: 'User does not exist' };
  return user;
};

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { message: 'User already registered' };
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateJWTToken(newUser.dataValues);
  return { token };
};

const getMyUser = async (headers) => {
  const { id } = jwt.decode(headers.authorization);
  User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getMyUser, 
};