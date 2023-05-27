import { useState } from 'react';
import {
  notificationStatus,
  showNotification,
} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const BlogForm = ({ createBlog, toggableRef, getAllBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleBlogFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await createBlog({ title, author, url });
      dispatch(
        showNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} is added`,
          notificationStatus.SUCCESS
        )
      );
      getAllBlogs();
    } catch (e) {
      dispatch(showNotification('Error', notificationStatus.ERROR));
      console.error(e);
    } finally {
      toggableRef.current.toggleVisibility();
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
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit" id="create-button">
          create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
