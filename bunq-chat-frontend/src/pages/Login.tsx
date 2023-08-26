import { FormEvent, useEffect, useState } from 'react';
import useLoginStore from '../store/login.store.ts';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn } = useLoginStore((state) => state);
  async function triggerLogin(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (username === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }
    await login(username, password);
  }

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/app';
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1>Login</h1>
      <form className="flex flex-col gap-2" onSubmit={triggerLogin}>
        <input onInput={(e) => setUsername(e.currentTarget.value)} type="text" placeholder="Username" />
        <input onInput={(e) => setPassword(e.currentTarget.value)} type="password" placeholder="Password" />
        <button className="btn" type="submit">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
