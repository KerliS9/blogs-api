const Joi = require('joi');
const statusCode = require('../utils/httpStatus');

const messageOnScreen = () => 'Some required fields are missing';

const newUserValidation = (req, _res, next) => {
  const user = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  });

  const { error } = user.validate(req.body);

  if (error) {
    return next({
      statusCode: statusCode.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
  next();
};

const newCategory = (req, _res, next) => {
  const category = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = category.validate(req.body);

  if (error) {
    return next({
      statusCode: statusCode.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
  next();
};

const newPost = (req, _res, next) => {
  const post = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items().min(1).required(),
  });

  const { error } = post.validate(req.body);

  if (error) {
    return next({
      statusCode: statusCode.BAD_REQUEST,
      message: messageOnScreen(),
    });
  }
  next();
};

const updatePost = (req, _res, next) => {
  const post = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error } = post.validate(req.body);

  if (error) {
    return next({
      statusCode: statusCode.BAD_REQUEST,
      message: messageOnScreen(),
    });
  }
  next();
};

module.exports = { newUserValidation, newCategory, newPost, updatePost };