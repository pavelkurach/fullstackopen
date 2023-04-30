/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const userExtractor = require('../utils/middleware').userExtractor;

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    response.status(204).end();
  }
  const user = request.user;
  if (blog.user.toString() !== user._id.toString()) {
    response.status(401).json({ error: 'token invalid' });
  }
  user.blogs = user.blogs.filter(b => b.id !== request.params.id);
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user;

  if (await Blog.findById(request.params.id)) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { ...request.body, user: user._id },
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );
    response.status(200).json(updatedBlog);
  } else {
    const blog = new Blog({
      _id: request.params.id,
      ...request.body,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    user.save();
    response.status(201).json(savedBlog);
  }
});

module.exports = blogsRouter;
