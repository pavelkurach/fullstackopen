import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  if (!user.blogs) {
    return null;
  }

  const userBlogs = blogs.filter((blog) => blog.user.id === user.id);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
