const testingRouter = require('express').Router();
const Blog = require('../models/blog');

testingRouter.post('/reset/', async () => {
  await Blog.deleteMany({});
});

module.exports = testingRouter;
