const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category, User } = require('../database/models');

const getAllPost = async () => {
    const posts = await BlogPost.findAll({
      include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', attributes: { exclude: ['postCategory'] } },
      ],
  });
    return posts;
  };

  const getPostById = async ({ id }) => {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) return { message: 'Post does not exist' };
    return BlogPost.findOne({
      where: { id },
      include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', attributes: { exclude: ['postCategory'] } },
      ],
  });
  };

const categoryExist = (categories) => Promise.all(categories.map(async (id) => {
    const category = await Category.findByPk(id);
    if (!category) return false;
    return true;
  }));

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

const updatePostById = async (params, headers, body) => {
  const { id } = params;
  const { title, content } = body;
  const { id: userId } = jwt.decode(headers.authorization);
  const { dataValues } = await BlogPost.findByPk(id);
  if (dataValues.userId !== userId) return { message: 'Unauthorized user' };
  await BlogPost.update({ title, content }, { where: { id } });
  // return getPostById(id);
  return BlogPost.findOne({
    where: { id },
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', attributes: { exclude: ['postCategory'] } },
    ],
});
};

const deletePostById = async (params, headers) => {
  const { id } = params;
  const { id: userId } = jwt.decode(headers.authorization);
  const post = await BlogPost.findByPk(id);
  // console.log('service', post);
  if (!post) return { message: 'Post does not exist' };
  if (post.dataValues.userId !== userId) return { message: 'Unauthorized user' };
  // return getPostById(id);
  BlogPost.destroy({ where: { id } });
};

const getPostByContent = async (params) => {
  console.log('service', params);
  /* const blogPost = await BlogPost.findByPk(id);
  if (!blogPost) return { message: 'Post does not exist' };
  return BlogPost.findOne({
    where: { id },
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', attributes: { exclude: ['postCategory'] } },
    ],
}); */
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  getPostByContent,
};
