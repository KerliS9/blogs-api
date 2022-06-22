const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newPost, updatePost } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const postRouter = express.Router();
const postService = require('../services/postService');

postRouter.get('/:id', authenticationMiddleware, async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params);
    if (post.message) {
      return res.status(statusCode.NOT_FOUND).json(post);
    }
    return res.status(statusCode.OK).json(post);
  } catch (e) {
    next(e);
  }
}); 
postRouter.get('/', authenticationMiddleware, async (_req, res, next) => {
  try {
    const posts = await postService.getAllPost();
    return res.status(statusCode.OK).json(posts);
  } catch (e) {
    next(e);
  }
}); 

postRouter.post('/', authenticationMiddleware, newPost, 
async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body, req.headers);
    if (post.message) {
      return res.status(statusCode.BAD_REQUEST).json(post);
    }
    return res.status(statusCode.CREATED).json(post);
  } catch (e) {
    next(e);
  }
});

postRouter.put('/:id', authenticationMiddleware, updatePost, async (req, res, next) => {
  try {
    const post = await postService.updatePostById(req.params, req.headers, req.body);
    if (post.message) {
      return res.status(statusCode.UNAUTHORIZED).json(post);
    }
    return res.status(statusCode.OK).json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = postRouter;