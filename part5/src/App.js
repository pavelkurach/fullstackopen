import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import { Notification, notificationStatus } from './components/Notification';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const showNotification = (message, status) => {
    setNotification({
      message,
      status,
    });
    setTimeout(() => {
      setNotification({
        message: null,
        status: null,
      });
    }, 2000);
  };

  const getAllBlogs = () => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
      getAllBlogs();
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBloglistAppUser');
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem(
        'loggedBloglistAppUser',
        JSON.stringify(user),
      );
      getAllBlogs();
    } catch (e) {
      showNotification('Wrong credentials', notificationStatus.ERROR);
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
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  };

  const blogForm = () => (
    <Toggable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm
        token={user.token}
        showNotification={showNotification}
        toggableRef={blogFormRef}
        getAllBlogs={getAllBlogs}
      />
    </Toggable>
  );

  const handleLike = async blog => {
    const newBlog = { likes: blog.likes + 1 };
    await blogService.update(blog.id, newBlog, user.token);
    getAllBlogs();
  };

  const handleDelete = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id, user.token);
      getAllBlogs();
    }
  };

  return (
    <div>
      <Notification
        message={notification.message}
        status={notification.status}
      />
      <h2>blogs</h2>
      {user === null ? loginForm() : loggedInUser()}
      {user !== null && blogForm()}
      {user !== null &&
        blogs
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map(blog => (
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
