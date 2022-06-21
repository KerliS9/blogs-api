const { BlogPost, User, Category } = require('../database/models');
// const user = require('../database/models/user');

const getAllPost = async () => {
    const posts = await BlogPost.findAll();
    return posts;
  };

const createPost = async (body) => {
  const { title, content, categoryIds } = body;
  console.log('service body', body);
  const categoryExist = await Promise.all(categoryIds.map(async (cat) => {
    const tes = await Category.findByPk(cat);
    console.log('dentro do promise', tes);
    return tes;
  }));
  console.log('service category', categoryExist.find((cat) => cat === null));
  if ((categoryExist.find((cat) => cat === null)) === null) {
    return { message: '"categoryIds" not found' };
  }
  const user = await User.findByPk(categoryIds[0]);
  console.log('service user', user.dataValues.id);
  const userId = user.dataValues.id;
  await BlogPost.create({ title, content, userId });
  const posts = await BlogPost.findAll();
  return posts;
};

module.exports = {
  getAllPost,
  createPost,  
};