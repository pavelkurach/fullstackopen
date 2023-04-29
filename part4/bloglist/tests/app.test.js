/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

describe('blogs api', () => {
  const blogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
  ];

  const stripOfIdAndV = ({ title, author, url, likes }) => ({
    title,
    author,
    url,
    likes,
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of blogs) {
      await new Blog(blog).save();
    }
  });

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
    expect(responseBlogs).toContainEqual(blogs[0]);
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Angular patterns',
      author: 'Michael Chan',
      url: 'https://angularpatterns.com/',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length + 1);
    const responseBlogs = response.body.map(blog => stripOfIdAndV(blog));
    expect(responseBlogs).toContainEqual(newBlog);
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

    await api
      .post('/api/blogs')
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

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('blogs without url are not accepted and return status code 400', async () => {
    const newBlog = {
      title: 'Angular patterns',
      author: 'Michael Chan',
      likes: 9,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  afterAll(async () => {
    await Blog.deleteMany({});
    await mongoose.connection.close();
  });
});
