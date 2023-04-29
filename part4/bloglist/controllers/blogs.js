/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({ ...request.body });
  const savedBlog = await blog.save();
  const user = await User.findById(blog.user);
  user.blogs = user.blogs.concat(savedBlog._id);
  user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  if (await Blog.findById(request.params.id)) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );
    response.status(200).json(updatedBlog);
  } else {
    const blog = new Blog({ _id: request.params.id, ...request.body });
    const savedBlog = await blog.save();
    const user = await User.findById(blog.user);
    user.blogs = user.blogs.concat(savedBlog._id);
    user.save();
    response.status(201).json(savedBlog);
  }
});

module.exports = blogsRouter;
