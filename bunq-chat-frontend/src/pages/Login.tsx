import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../store/login.store.ts';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn, fetchMe } = useLoginStore((state) => state);
  const navigate = useNavigate();
  async function triggerLogin(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (username === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    login(username, password).catch((err) => {
      setError(err.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchMe().then(() => {
        navigate('/app  ');
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1>Login</h1>
      <form className="flex flex-col gap-2" onSubmit={triggerLogin}>
        <input
          defaultValue={username}
          onInput={(e) => setUsername(e.currentTarget.value)}
          type="text"
          placeholder="Username"
        />
        <input
          defaultValue={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Password"
        />
        <button className={classNames('btn ', { '!bg-green-300/50': loading })} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="mb-[-2.5em] text-red-500">{error}</p>}
    </div>
  );
}
