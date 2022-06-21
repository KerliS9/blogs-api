const { Category, BlogPost } = require('../database/models');

/* const getAllCategories = async () => {
    const categories = await Category.findAll();
    return categories;
  };
 */
const createPost = async (body) => {
  const { name } = body;
  const category = await Category.findOne({ where: { name } });
  if (category) return { message: 'Category already registered' };
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  // getAllCategories,
  createPost,  
};