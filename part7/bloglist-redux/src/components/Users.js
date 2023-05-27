import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <Table hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
