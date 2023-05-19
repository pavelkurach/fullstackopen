import Blog from '../models/blog';

const testingRouter = require('express').Router();

testingRouter.post('/reset', async () => {
  await Blog.deleteMany({});
});
