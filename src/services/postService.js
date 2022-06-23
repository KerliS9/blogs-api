const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, PostCategory, Category, User } = require('../database/models');

const getAllPost = async () => BlogPost.findAll({
      include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
      ],
  });

  const getPostById = async (id) => {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) return { message: 'Post does not exist' };
    return BlogPost.findOne({
      where: { id },
      include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
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
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postId = newPost.dataValues.id;
    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId, categoryId }, { transaction: t });
    }));
    return newPost;
  });
  return result.dataValues;
};

const updatePostById = async (params, headers, body) => {
  const { id } = params;
  const { title, content } = body;
  const { id: userId } = jwt.decode(headers.authorization);
  const { dataValues } = await BlogPost.findByPk(id);
  if (dataValues.userId !== userId) return { message: 'Unauthorized user' };
  await BlogPost.update({ title, content }, { where: { id } });
  return getPostById(id);
};

const deletePostById = async (params, headers) => {
  const { id } = params;
  const { id: userId } = jwt.decode(headers.authorization);
  const post = await BlogPost.findByPk(id);
  if (!post) return { message: 'Post does not exist' };
  if (post.dataValues.userId !== userId) return { message: 'Unauthorized user' };
  BlogPost.destroy({ where: { id } });
};

const getPostByContent = async ({ q }) => {
  if (!q) return getAllPost();
  const posts = await BlogPost.findAll({ where: { [Op.or]: [
    { title: { [Op.substring]: q } },
    { content: { [Op.substring]: q } },
  ] },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});
  if (posts.length === 0) return false;
  return posts;
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  getPostByContent,
};
