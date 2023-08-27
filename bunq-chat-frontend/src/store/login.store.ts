import { create } from 'zustand';
import { LoginDto } from '../types/login.dto.ts';
import Environment from '../utils/environment.ts';
import { User } from './user.store.ts';
import ApiClient from '../utils/ApiClient.ts';

export interface Login {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  currentUser?: User;
  login: (username: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
  refresh: () => void;
}

const useLoginStore = create<Login>((set) => ({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  login: async (username: string, password: string) => {
    const { execute } = ApiClient({
      method: 'POST',
      authenticated: false,
      path: `/api/auth/login`,
      body: { username, password },
    });
    const loginResult = await execute().then((response) => response.data as LoginDto);

    localStorage.setItem('accessToken', loginResult.accessToken);
    localStorage.setItem('refreshToken', loginResult.accessToken);
    set({ isLoggedIn: true, accessToken: loginResult.accessToken, refreshToken: loginResult.refreshToken });
  },
  refresh: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      window.location.href = '/logout';
    }

    const { execute } = ApiClient({
      method: 'POST',
      authenticated: false,
      path: `/api/auth/refresh`,
      body: { refreshToken: refreshToken! },
    });
    const loginResult = await execute().then((response) => response.data as LoginDto);

    localStorage.setItem('accessToken', loginResult.accessToken);
    localStorage.setItem('refreshToken', loginResult.accessToken);
    set({ isLoggedIn: true, accessToken: loginResult.accessToken, refreshToken: loginResult.refreshToken });
  },
  fetchMe: async () => {
    // TODO: Implement login
    const currentUser = await fetch(`${Environment.authApiBaseUrl}/api/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((response) => response.data as User)
      .catch(async (err) => {
        throw await err.json();
      });
    localStorage.setItem('userId', currentUser.id.toString());
    localStorage.setItem('userName', currentUser.name);
    set({ currentUser });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ isLoggedIn: false, accessToken: '', refreshToken: '' });
  },
}));

export default useLoginStore;
