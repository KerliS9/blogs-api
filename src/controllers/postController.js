const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newPost } = require('../middleware/validations');
// const { authenticationMiddleware } = require('../middleware/authMiddleware');

const postRouter = express.Router();
const postService = require('../services/postService');

postRouter.get('/', /* authenticationMiddleware, */ async (req, res, next) => {
  try {
    const posts = await postService.getAllPost(req.headers);
    // console.log('controllers', posts);
    return res.status(statusCode.OK).json(posts);
  } catch (e) {
    next(e);
  }
}); 

postRouter.post('/', /* authenticationMiddleware, */ newPost, async (req, res, next) => {
  // console.log('controllers', req.headers);
  try {
    const post = await postService.createPost(req.body, req.headers);
    // console.log('controllers', post);
    if (post.message) {
      return res.status(statusCode.BAD_REQUEST).json(post);
    }
    return res.status(statusCode.CREATED).json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = postRouter;