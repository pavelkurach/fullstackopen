/* eslint-disable no-unused-vars */
const NODE_ENV = require('./config').NODE_ENV;

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

  return response.status(500).end();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
