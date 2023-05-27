import Blog from './Blog';
import { useDispatch, useSelector } from 'react-redux';
import Toggable from './Toggable';
import BlogForm from './BlogForm';
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h2>Blogs</h2>
      {user !== null && blogForm()}
      {user !== null &&
        [...blogs]
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <div
              style={{ border: '1px solid black', margin: '2px' }}
              key={blog.id}
            >
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
    </div>
  );
};

export default Blogs;
