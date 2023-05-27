import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import { Notification } from './components/Notification';
import {
  notificationStatus,
  showNotification,
} from './reducers/notificationReducer';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, createBlog } from './reducers/blogsReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
      dispatch(getAllBlogs());
    }
  }, [dispatch]);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBloglistAppUser');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem(
        'loggedBloglistAppUser',
        JSON.stringify(user)
      );
      dispatch(getAllBlogs());
    } catch (e) {
      dispatch(showNotification('Wrong credentials', notificationStatus.ERROR));
      console.error(e);
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      setUsername={({ target }) => setUsername(target.value)}
      setPassword={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
    />
  );

  const loggedInUser = () => {
    return (
      <div>
        {user.name} is logged in.
        <button onClick={handleLogout} id="logout-button">
          logout
        </button>
      </div>
    );
  };

  const blogForm = () => (
    <Toggable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm
        toggableRef={blogFormRef}
        createBlog={(blog) => createBlog(blog, user.token)}
      />
    </Toggable>
  );

  const handleLike = async (blog) => {
    const newBlog = { likes: blog.likes + 1 };
    await blogService.update(blog.id, newBlog, user.token);
    dispatch(getAllBlogs());
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id, user.token);
      dispatch(getAllBlogs());
    }
  };

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null ? loginForm() : loggedInUser()}
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
              username={user.username}
            />
          ))}
    </div>
  );
};

export default App;
