const { User } = require('../database/models');
// const statusCode = require('../utils/httpStatus');
const { generateJWTToken } = require('../utils/generateTokenJWT');

const getAllUsers = async () => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  };

const getUserById = async ({ id }) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });
  if (!user) return { message: 'User does not exist' };
  return user;
};

const createUser = async (body) => {
  // console.log('params', body);
  const { displayName, email, password, image } = body;
  const user = await User.findOne({ where: { email } });
  if (user) return { message: 'User already registered' };
  const newUser = await User.create({ displayName, email, password, image });
  // console.log('service create', newUser);
  const token = generateJWTToken(newUser.dataValues);
  return { token };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,  
};