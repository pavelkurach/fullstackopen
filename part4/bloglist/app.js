const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');
const unknownEndpoint = require('./utils/middleware').unknownEndpoint;
const errorHandler = require('./utils/middleware').errorHandler;
const tokenExtractor = require('./utils/middleware').tokenExtractor;
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :body - :response-time ms'));
app.use(tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/testing', testingRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const url = require('./utils/config').MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

module.exports = app;
