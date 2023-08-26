import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home.tsx';
import LoginPage from './pages/Login.tsx';
import Authenticator from './components/Authenticator.tsx';
import LogoutPage from './pages/Logout.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<Authenticator />}>
          <Route path="/app" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
