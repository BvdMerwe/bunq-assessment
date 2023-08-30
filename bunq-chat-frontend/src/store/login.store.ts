import { create } from 'zustand';
import { LoginDto } from '../types/login.dto.ts';
import Environment from '../utils/environment.ts';
import { User } from './user.store.ts';
import ApiClient from '../utils/ApiClient.ts';

export interface Login {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  currentUser: User;
  login: (username: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
  refresh: () => void;
}

const useLoginStore = create<Login>((set) => ({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  currentUser: <User>{},
  login: async (username: string, password: string) => {
    const { execute } = ApiClient({
      method: 'POST',
      authenticated: false,
      path: `/api/auth/login`,
      body: { username, password },
      baseUrl: Environment.authApiBaseUrl,
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
      baseUrl: Environment.authApiBaseUrl,
    });
    const loginResult = await execute().then((response) => response.data as LoginDto);

    localStorage.setItem('accessToken', loginResult.accessToken);
    localStorage.setItem('refreshToken', loginResult.accessToken);
    set({ isLoggedIn: true, accessToken: loginResult.accessToken, refreshToken: loginResult.refreshToken });
  },
  fetchMe: async () => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/auth/me`,
      baseUrl: Environment.authApiBaseUrl,
    });
    const currentUser = await execute().then((response) => response.data as User);
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
