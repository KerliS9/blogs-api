const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newCategory } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const postRouter = express.Router();
const postService = require('../services/postService');

/* postRouter.get('/', authenticationMiddleware, async (_req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(statusCode.OK).json(categories);
  } catch (e) {
    next(e);
  }
});  */

postRouter.post('/', authenticationMiddleware, newCategory, async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body);
    if (post.message) {
      return res.status(statusCode.CONFLICT).json(post);
    }
    return res.status(statusCode.CREATED).json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = postRouter;