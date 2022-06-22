const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Category } = require('../database/models');

const getAllPost = async (headers) => {
  const user = jwt.decode(headers.authorization);
  console.log('getAllPost', user);
    const posts = await BlogPost.findAll(/* {
      include: [
          { model: User, as: 'user', attributes: { exclude: ['iat', 'exp'] } },
          { model: Category, as: 'categories' },
      ],
  } */);
    return posts;
  };

const categoryExist = (categories) => {
  const cat = Promise.all(categories.map(async (id) => {
    const category = await Category.findOne({ where: { id } });
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