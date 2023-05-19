import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, token, getAllBlogs, username }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };

  const handleLike = async () => {
    const newBlog = { likes: blog.likes + 1 };
    await blogService.update(blog.id, newBlog, token);
    getAllBlogs();
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id, token);
      getAllBlogs();
    }
  };

  const deleteButton = () => (
    <div>
      <button onClick={handleDelete}>delete</button>
    </div>
  );

  return (
    <div style={{ border: '1px solid black', margin: '2px' }}>
      {blog.title}{' '}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.author}</div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === username && deleteButton()}
      </div>
    </div>
  );
};

export default Blog;
