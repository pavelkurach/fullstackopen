import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url.com',
  };
  const createBlog = jest.fn();
  const showNotification = jest.fn();
  const getAllBlogs = jest.fn();
  const toggableRef = {
    current: {
      toggleVisibility: jest.fn(),
    },
  };
  const user = userEvent.setup();
  const { container } = render(
    <BlogForm
      createBlog={createBlog}
      showNotification={showNotification}
      toggableRef={toggableRef}
      getAllBlogs={getAllBlogs}
    />,
  );
  const submitButton = screen.getByText('create');
  const title = container.querySelector('#title');
  await user.type(title, blog.title);
  const author = container.querySelector('#author');
  await user.type(author, blog.author);
  const url = container.querySelector('#url');
  await user.type(url, blog.url);
  await user.click(submitButton);
  expect(createBlog.mock.calls[0][0]).toEqual(blog);
});
