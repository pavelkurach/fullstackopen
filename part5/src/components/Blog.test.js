import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

// eslint-disable-next-line quotes
test("blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const blog = {
    title: 'title',
    author: 'author',
    user: {
      username: 'user1',
      name: 'User 1',
      blogs: ['64675abdf02617c94078174b'],
      id: '64675a0d0531660cfe1e6d6d',
    },
    url: 'url.com',
    likes: 2,
    id: '64675abdf02617c94078174b',
  };

  const { container } = render(<Blog blog={blog} />);
  const noteDiv = container.querySelector('.blog');
  expect(noteDiv).toBeDefined();
  expect(noteDiv).toHaveTextContent(blog.title);
  expect(noteDiv).toHaveTextContent(blog.author);
  expect(noteDiv).not.toHaveTextContent(blog.url);
  expect(noteDiv).not.toHaveTextContent(blog.likes);
});
