const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category } = require('../database/models');
// const user = require('../database/models/user');

const getAllPost = async () => {
    const posts = await BlogPost.findAll();
    return posts;
  };

const createPost = async (body, headers) => {
  const { title, content, categoryIds } = body;
  // console.log('service body', headers);
  const { id: userId } = jwt.decode(headers.authorization);
  // console.log('payload', userId);
  const categoryExist = await Promise.all(categoryIds.map(async (cat) => {
    await Category.findByPk(cat);
    // console.log('dentro do promise', tes);
    // return tes;
  }));
  // console.log('service category', categoryExist.find((cat) => cat === null));
  if ((categoryExist.find((cat) => cat === null)) === null) {
    return { message: '"categoryIds" not found' };
  }
  // console.log('categoryExist', categoryExist);
  // return categoryExist;

  const newPost = await BlogPost.create({ title, content, userId });
  const postId = newPost.dataValues.id;
  const newPostCategory = await Promise.all(categoryIds.map(async (categoryId) => {
    console.log('inserir na PostCategory', { postId, categoryId });
    await PostCategory.create({ postId, categoryId });
    // return tes;
  }));
  console.log('newPostCategory', newPostCategory);
  return newPost;
};

module.exports = {
  getAllPost,
  createPost,  
};
/* const addPost = await Promise.all(categoryIds.map(async (cat) => {
  // const user = await User.findByPk(cat);
  // const user = await BlogPost.findByPk(cat);
  // console.log('prom', user);
  // const userId = user.dataValues.id;
  const newPost = await BlogPost.create({ title, content, userId });
  return newPost;
}));
return addPost; */

/* const user = await User.findByPk(categoryIds[0]);
console.log('service user', user);
const userId = user.dataValues.id;
const newPost = await BlogPost.create({ title, content, userId });
console.log('newPost criado', newPost);
const { id } = newPost.dataValues;
console.log('id', id);
const posts = await BlogPost.findOne({ where: { id } });
return posts; */