import PropTypes from 'prop-types';
import { Form, Button, FormGroup } from 'react-bootstrap';

export default function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={setUsername}
            id="username"
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={setPassword}
            id="password"
          />
          <br />
          <Button variant="primary" type="submit" id="login-button">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
