const { Category } = require('../database/models');

const getAllCategories = async () => Category.findAll();

const createCategory = async ({ name }) => {
  const category = await Category.findOne({ where: { name } });
  if (category) return { message: 'Category already registered' };
  return Category.create({ name });
};

module.exports = {
  getAllCategories,
  createCategory,  
};