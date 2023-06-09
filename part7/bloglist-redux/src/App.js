import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import { Notification } from './components/Notification';
import {
  notificationStatus,
  showNotification,
} from './reducers/notificationReducer';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  likeBlog,
} from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';
import Users from './components/Users';
import { getAllUsers } from './reducers/usersReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Blogs from './components/Blogs';
import User from './components/User';
import { Button, Navbar, Nav } from 'react-bootstrap';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser');
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)));
      dispatch(getAllBlogs());
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem('loggedBloglistAppUser');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
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
      <span style={{ color: 'white' }}>
        {user.name} is logged in.{' '}
        <Button onClick={handleLogout} id="logout-button">
          logout
        </Button>
      </span>
    );
  };

  const navigationMenu = () => {
    const padding = {
      paddingRight: 5,
    };
    return (
      <Navbar bg="dark">
        <Nav>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
        </Nav>
        {loggedInUser()}
      </Navbar>
    );
  };

  if (user === null) {
    return (
      <div style={{ marginTop: '50px' }} className="container">
        <Notification />
        {loginForm()}
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '10px' }}>
      <Router>
        {navigationMenu()}
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
