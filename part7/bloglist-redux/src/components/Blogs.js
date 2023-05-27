import Blog from './Blog';
import { useDispatch, useSelector } from 'react-redux';
import Toggable from './Toggable';
import BlogForm from './BlogForm';
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { useRef } from 'react';

const Blogs = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  const blogForm = () => (
    <Toggable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm
        toggableRef={blogFormRef}
        createBlog={(blog) => createBlog(blog, user.token)}
      />
    </Toggable>
  );

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog, user.token));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id, user.token));
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      {user !== null && blogForm()}
      {user !== null &&
        [...blogs]
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleDelete={() => handleDelete(blog)}
              s
              username={user.username}
            />
          ))}
    </div>
  );
};

export default Blogs;
