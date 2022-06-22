const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category, User } = require('../database/models');

const getAllPost = async () => {
    const posts = await BlogPost.findAll({
      include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', attributes: { exclude: ['postCategory'] } },
      ],
  });
  console.log('service', posts);
    return posts;
  };

  const getPostById = async ({ id }) => {
    console.log('getPostById', id);
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) return { message: 'Post does not exist' };
    console.log('getPostById', blogPost);
    const posts = await BlogPost.findOne({
      where: { id },
      include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', attributes: { exclude: ['postCategory'] } },
      ],
  });
  // console.log('service', posts);
    return posts;
  };

const categoryExist = (categories) => {
  const cat = Promise.all(categories.map(async (id) => {
    const category = await Category.findByPk(id);
    if (!category) return false;
    return true;
  }));
  return cat;
};

const createPost = async (body, headers) => {
  const { title, content, categoryIds } = body;
  const { id: userId } = jwt.decode(headers.authorization);
  const checkCategory = await categoryExist(categoryIds);
  if (checkCategory.includes(false)) {
    return { message: '"categoryIds" not found' };
  }
  const newPost = await BlogPost.create({ title, content, userId });
  const postId = newPost.dataValues.id;
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId, categoryId });
  }));
  return newPost;
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,  
};
