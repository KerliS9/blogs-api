const express = require('express');
const rescue = require('express-rescue');
const statusCode = require('../utils/httpStatus');
const { newPost, updatePost } = require('../middleware/validations');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const postRouter = express.Router();
const postService = require('../services/postService');

postRouter.use(authenticationMiddleware);

postRouter.get('/search', rescue(async (req, res) => {
    const post = await postService.getPostByContent(req.query);
    if (!post) {
      return res.status(statusCode.OK).json([]);
    }
    return res.status(statusCode.OK).json(post);
}));

postRouter.get('/:id', rescue(async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    if (post.message) {
      return res.status(statusCode.NOT_FOUND).json(post);
    }
    return res.status(statusCode.OK).json(post);
}));

postRouter.get('/', rescue(async (_req, res) => {
    const posts = await postService.getAllPost();
    return res.status(statusCode.OK).json(posts);
})); 

postRouter.post('/', newPost, rescue(async (req, res) => {
    const post = await postService.createPost(req.body, req.headers);
    if (post.message) {
      return res.status(statusCode.BAD_REQUEST).json(post);
    }
    return res.status(statusCode.CREATED).json(post);
}));

postRouter.put('/:id', updatePost, rescue(async (req, res) => {
    const post = await postService.updatePostById(req.params, req.headers, req.body);
    if (post.message) {
      return res.status(statusCode.UNAUTHORIZED).json(post);
    }
    return res.status(statusCode.OK).json(post);
}));

postRouter.delete('/:id', rescue(async (req, res) => {
    const post = await postService.deletePostById(req.params, req.headers);
    if (post === undefined) {
      return res.status(statusCode.NO_CONTENT).send();
    }
    if (post.message === 'Unauthorized user') {
      return res.status(statusCode.UNAUTHORIZED).json(post);
    } 
    return res.status(statusCode.NOT_FOUND).json(post);
}));

module.exports = postRouter;