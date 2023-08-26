import { create } from 'zustand';
import { UserDto } from '../types/user.dto.ts';
import Environment from '../utils/environment.ts';

export interface User {
  id: number;
  name: string;
  last_seen_at?: string;
}

const useUserStore = create<User>((set) => ({
  id: 0,
  name: '',
  fetch: async (id: number) => {
    const result: UserDto = await fetch(`${Environment.apiBaseUrl}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data: UserDto) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    return set({ id, name: result.data.name });
  },
}));

export default useUserStore;
