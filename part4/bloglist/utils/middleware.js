/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NODE_ENV = require('./config').NODE_ENV;

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    response.status(401).json({ error: 'token invalid' });
  } else {
    request.user = await User.findById(decodedToken.id);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  if (NODE_ENV !== 'test') {
    console.error(error.message);
  }

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'DocumentNotFoundError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  return response.status(500).end();
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
