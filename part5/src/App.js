import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import { Notification, notificationStatus } from './components/Notification';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
    } catch (e) {
      showNotification('Wrong credentials', notificationStatus.ERROR);
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
    return <div>{user.name} is logged in.</div>;
  };

  return (
    <div>
      <Notification
        message={notification.message}
        status={notification.status}
      />
      <h2>blogs</h2>
      {user === null ? loginForm() : loggedInUser()}
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
