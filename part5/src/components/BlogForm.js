import { useState } from 'react';
import blogService from '../services/blogs';
import { notificationStatus } from './Notification';

const BlogForm = ({ token, showNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogFormSubmit = async event => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url }, token);
      showNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} is added`,
        notificationStatus.SUCCESS,
      );
    } catch (e) {
      showNotification('Error', notificationStatus.ERROR);
      console.error(e);
    } finally {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleBlogFormSubmit}>
      <div>
        <label onSubmit={handleBlogFormSubmit}>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  );
};

export default BlogForm;
