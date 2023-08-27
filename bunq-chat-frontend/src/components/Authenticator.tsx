import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useLoginStore from '../store/login.store.ts';

export default function Authenticator() {
  const userToken = localStorage.getItem('accessToken');
  const { fetchMe } = useLoginStore((state) => state);

  useEffect(() => {
    if (userToken) {
      fetchMe();
    }
  }, []);

  if (!userToken) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
