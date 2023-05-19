import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

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

// eslint-disable-next-line quotes
test("blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const { container } = render(<Blog blog={blog} />);
  const noteDiv = container.querySelector('.blog');
  expect(noteDiv).toBeDefined();
  expect(noteDiv).toHaveTextContent(blog.title);
  expect(noteDiv).toHaveTextContent(blog.author);
  expect(noteDiv).not.toHaveTextContent(blog.url);
  expect(noteDiv).not.toHaveTextContent(blog.likes);
});

// eslint-disable-next-line quotes
test("the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const user = userEvent.setup();
  const { container } = render(<Blog blog={blog} />);
  const noteDiv = container.querySelector('.blog');
  expect(noteDiv).toBeDefined();
  const button = screen.getByText('view');
  await user.click(button);
  expect(noteDiv).toHaveTextContent(blog.url);
  expect(noteDiv).toHaveTextContent(blog.likes);
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const mockLikeHandler = jest.fn();
  const user = userEvent.setup();
  render(<Blog blog={blog} handleLike={mockLikeHandler} />);

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
