const { Category } = require('../database/models');
// const statusCode = require('../utils/httpStatus');
// const { generateJWTToken } = require('../utils/generateTokenJWT');

/* const getAllUsers = async () => {
    const users = await Category.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  };

const getUserById = async ({ id }) => {
  const user = await Category.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });
  if (!user) return { message: 'User does not exist' };
  return user;
}; */

const createCategory = async (body) => {
  // console.log('params', body);
  const { name } = body;
  const category = await Category.findOne({ where: { name } });
  if (category) return { message: 'Category already registered' };
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  // getAllUsers,
  // getUserById,
  createCategory,  
};