const express = require('express');
const statusCode = require('../utils/httpStatus');
const { newPost, updatePost } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const postRouter = express.Router();
const postService = require('../services/postService');

postRouter.use(authenticationMiddleware);

postRouter.get('/search', async (req, res, next) => {
  console.log('conectaria', req.query);
  try {
    const post = await postService.getPostByContent(req.params, req.query);
    console.log('controller post', post);
    /* if (post.message) {
      return res.status(statusCode.NOT_FOUND).json(post);
    } */
    return res.status(statusCode.OK).json(post);
  } catch (e) {
    next(e);
  }
});

postRouter.get('/:id', async (req, res, next) => {
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

postRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await postService.getAllPost();
    return res.status(statusCode.OK).json(posts);
  } catch (e) {
    next(e);
  }
}); 

postRouter.post('/', newPost, async (req, res, next) => {
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

postRouter.put('/:id', updatePost, async (req, res, next) => {
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

postRouter.delete('/:id', async (req, res, next) => {
  try {
    const post = await postService.deletePostById(req.params, req.headers);
    console.log('conectaria', post);
    if (post === undefined) {
      return res.status(statusCode.NO_CONTENT).send();
    }
    if (post.message === 'Unauthorized user') {
      return res.status(statusCode.UNAUTHORIZED).json(post);
    } 
    return res.status(statusCode.NOT_FOUND).json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = postRouter;