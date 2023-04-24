const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const unknownEndpoint = require('./utils/middleware').unknownEndpoint;
const errorHandler = require('./utils/middleware').errorHandler;
const blogsRouter = require('./controllers/blogs');

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :body - :response-time ms'));

app.use('/api/blogs', blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
