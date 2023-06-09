const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const validatePassword = password => {
  if (password.length < 3) {
    throw new ValidationError(
      'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).',
    );
  }
};

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  validatePassword(password);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

/*
usersRouter.put('/:id', async (request, response) => {
  if (await User.findById(request.params.id)) {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );
    response.status(200).json(updatedUser);
  } else {
    const user = new User({ _id: request.params.id, ...request.body });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  }
});
*/

module.exports = usersRouter;
