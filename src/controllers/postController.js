const statusCode = require('../utils/httpStatus');
const postService = require('../services/postService');

const getPostByContent = async (req, res) => {
    const post = await postService.getPostByContent(req.query);
    if (!post) {
      return res.status(statusCode.OK).json([]);
    }
    return res.status(statusCode.OK).json(post);
};

const getPostById = async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    if (post.message) {
      return res.status(statusCode.NOT_FOUND).json(post);
    }
    return res.status(statusCode.OK).json(post);
};

const getAllPost = async (_req, res) => {
    const posts = await postService.getAllPost();
    return res.status(statusCode.OK).json(posts);
}; 

const createPost = async (req, res) => {
    const post = await postService.createPost(req.body, req.headers);
    if (post.message) {
      return res.status(statusCode.BAD_REQUEST).json(post);
    }
    return res.status(statusCode.CREATED).json(post);
};

const updatePostById = async (req, res) => {
    const post = await postService.updatePostById(req.params, req.headers, req.body);
    if (post.message) {
      return res.status(statusCode.UNAUTHORIZED).json(post);
    }
    return res.status(statusCode.OK).json(post);
};

const deletePostById = async (req, res) => {
    const post = await postService.deletePostById(req.params, req.headers);
    if (post === undefined) {
      return res.status(statusCode.NO_CONTENT).send();
    }
    if (post.message === 'Unauthorized user') {
      return res.status(statusCode.UNAUTHORIZED).json(post);
    } 
    return res.status(statusCode.NOT_FOUND).json(post);
};

module.exports = {
  getPostByContent,
  getPostById,
  getAllPost,
  createPost,
  updatePostById,
  deletePostById };