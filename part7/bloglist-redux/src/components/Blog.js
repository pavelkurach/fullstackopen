import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  if (!user) {
    return null;
  }

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog, user.token));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id, user.token));
      navigate('/');
    }
  };

  const deleteButton = () => (
    <div>
      <button onClick={handleDelete} id="delete-button">
        delete
      </button>
    </div>
  );

  const blogDetails = () => (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div id="likes">
        likes {blog.likes}{' '}
        <button onClick={handleLike} id="like-button">
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {blog.user.username === user.username && deleteButton()}
    </div>
  );

  return (
    <div>
      <h2>{blog.title}</h2>
      {blog.author} {blogDetails()}
    </div>
  );
};

export default Blog;
