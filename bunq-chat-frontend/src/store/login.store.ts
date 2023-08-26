import { create } from 'zustand';
import { LoginDto } from '../types/login.dto.ts';
import Environment from '../utils/environment.ts';

export interface Login {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useLoginStore = create<Login>((set) => ({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  login: async (username: string, password: string) => {
    // TODO: Implement login
    const loginResult: LoginDto = await fetch(`${Environment.apiBaseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data: Login) => ({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoggedIn: true,
      }))
      .catch((err) => {
        console.error(err);
        throw err;
      });
    // const loginResult: LoginDto = {
    //   accessToken: `${username} + ${password}`,
    //   refreshToken: 'decafc0ffee',
    // };
    localStorage.setItem('accessToken', loginResult.accessToken);
    localStorage.setItem('refreshToken', loginResult.accessToken);
    set({ isLoggedIn: true, accessToken: loginResult.accessToken, refreshToken: loginResult.refreshToken });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ isLoggedIn: false, accessToken: '', refreshToken: '' });
  },
}));

export default useLoginStore;
