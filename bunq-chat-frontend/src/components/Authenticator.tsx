import { Navigate, Outlet } from 'react-router-dom';

export default function Authenticator() {
  const userToken = localStorage.getItem('accessToken');
  if (!userToken) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
