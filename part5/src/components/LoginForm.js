import PropTypes from 'prop-types';

export default function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username:
          <input type='text' value={username} onChange={setUsername} />
        </label>
      </div>
      <div>
        <label>
          password:{' '}
          <input type='password' value={password} onChange={setPassword} />
        </label>
      </div>
      <button type='submit' id='login-button'>
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
