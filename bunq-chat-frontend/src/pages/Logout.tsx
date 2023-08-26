import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../store/login.store.ts';

export default function LogoutPage() {
  const { logout } = useLoginStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return <p>Logging out</p>;
}
