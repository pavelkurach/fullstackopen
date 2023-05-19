/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    user: '5a422a851b54a676234d17f8',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: '5a422a851b54a676234d17f8',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    user: '5a422a851b54a676234d17f8',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    user: '5a422a851b54a676234d17f8',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    user: '5a422a851b54a676234d17f8',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    user: '5a422a851b54a676234d17f8',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const stripOfIdAndV = ({ title, author, user, url, likes }) => ({
  title,
  author,
  user,
  url,
  likes,
});

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('root', 10);
  const user = new User({
    _id: '5a422a851b54a676234d17f8',
    username: 'root',
    password: passwordHash,
    name: 'root',
    blogs: [],
  });

  await user.save();
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findById('5a422a851b54a676234d17f8');
  user.blogs = [];
  await user.save();
  for (const blog of blogs) {
    const savedBlog = await new Blog(blog).save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  }
});

const getRootToken = async () => {
  const response = await api.post('/api/login').send({
    username: 'root',
    password: 'root',
  });
  return response.body.token;
};

describe('fetching blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
    const responseBlogs = response.body.map(blog => stripOfIdAndV(blog));
    expect(responseBlogs).toContainEqual({
      ...blogs[0],
      user: {
        id: '5a422a851b54a676234d17f8',
        username: 'root',
        name: 'root',
        blogs: response.body.map(blog => blog.id),
      },
    });
  });
});

describe('saving blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 9,
    };

    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length + 1);
    const responseBlogs = response.body.map(blog => stripOfIdAndV(blog));
    expect(responseBlogs).toContainEqual({
      ...newBlog,
      user: {
        id: '5a422a851b54a676234d17f8',
        username: 'root',
        name: 'root',
        blogs: response.body.map(blog => blog.id),
      },
    });
  });

  test('a blog cannot be added if token is invalid', async () => {
    const newBlog = {
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 9,
    };

    const token = '000';

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length);
  });

  test('unique identifier property is named id, not _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('likes defaults to 0', async () => {
    const id = '5a422a851b54a676234d17f7';
    const newBlog = {
      _id: id,
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
    };

    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const responseNewBlog = response.body.find(blog => blog.id === id);
    expect(responseNewBlog.likes).toBe(0);
  });

  test('blogs without title are not accepted and return status code 400', async () => {
    const newBlog = {
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 9,
    };

    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('blogs without url are not accepted and return status code 400', async () => {
    const newBlog = {
      title: 'Angular patterns',
      author: 'Michael Chan',
      likes: 9,
    };

    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('deleting blogs', () => {
  test('delete an existing note', async () => {
    const id = '5a422a851b54a676234d17f7';
    const newBlog = {
      _id: id,
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 5,
    };

    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
    expect(response.body).not.toContainEqual({
      ...newBlog,
      user: {
        id: '5a422a851b54a676234d17f8',
        username: 'root',
        name: 'root',
        blogs: response.body.map(blog => blog.id),
      },
    });
  });

  test('cannot delete an existing note if token is invalid', async () => {
    const id = '5a422a851b54a676234d17f7';
    const newBlog = {
      _id: id,
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 5,
    };

    const passwordHash = await bcrypt.hash('temp', 10);
    const user = new User({
      username: 'temp',
      password: passwordHash,
      name: 'temp',
      blogs: [],
    });
    await user.save();

    const invalidToken = (
      await api.post('/api/login').send({
        username: 'temp',
        password: 'temp',
      })
    ).body.token;

    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);

    const response = await api.get('/api/blogs');
    // expect(response.body).toHaveLength(blogs.length + 1);
    expect(response.body).toContainEqual({
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 5,
      id,
      user: {
        id: '5a422a851b54a676234d17f8',
        username: 'root',
        name: 'root',
        blogs: response.body.map(blog => blog.id),
      },
    });
  });

  test('delete a non-existing note', async () => {
    const id = '5a422a851b54a676234d17f7';
    const token = await getRootToken();
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });
});

describe('updating blogs', () => {
  test('update an existing note', async () => {
    const id = '5a422a851b54a676234d17f7';
    const newBlog = {
      _id: id,
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 5,
    };

    const newBlogUpdated = {
      title: 'Angular patterns 2 ed.',
      likes: 15,
    };
    const token = await getRootToken();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    let response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length + 1);

    await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogUpdated)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    response = await api.get('/api/blogs');
    const responseBlogs = response.body.map(blog => stripOfIdAndV(blog));
    expect(responseBlogs).toContainEqual(
      stripOfIdAndV({
        ...newBlog,
        ...newBlogUpdated,
        user: {
          id: '5a422a851b54a676234d17f8',
          username: 'root',
          name: 'root',
          blogs: response.body.map(blog => blog.id),
        },
      }),
    );
  });

  test('update a non-existing note', async () => {
    const id = '5a422a851b54a676234d17f7';
    const newBlog = {
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 9,
    };

    const blogsBefore = (await api.get('/api/blogs')).body;
    const token = await getRootToken();

    await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length + 1);
    const responseBlogs = response.body.map(blog => stripOfIdAndV(blog));
    expect(responseBlogs).toContainEqual({
      ...newBlog,
      user: {
        id: '5a422a851b54a676234d17f8',
        username: 'root',
        name: 'root',
        blogs: [...blogsBefore.map(blog => blog.id), id],
      },
    });
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await mongoose.connection.close();
});
