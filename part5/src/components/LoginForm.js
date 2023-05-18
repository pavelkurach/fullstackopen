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
      <button type='submit'>Login</button>
    </form>
  );
}
