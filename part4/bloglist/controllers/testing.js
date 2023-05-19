const testingRouter = require('express').Router();
const Blog = require('../models/blog');

testingRouter.post('/reset/', async (request, response) => {
  await Blog.deleteMany({});
  response.status(200).end();
});

module.exports = testingRouter;
