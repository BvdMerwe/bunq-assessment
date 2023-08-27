import { create } from 'zustand';
import ApiClient from '../utils/ApiClient.ts';
import { UserDto } from '../types/user.dto.ts';

export interface User {
  id: number;
  name: string;
  last_seen_at?: string;
}

const useUserStore = create<User>((set) => ({
  id: 0,
  name: '',
  fetch: async (id: number) => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}`,
    });
    const result = (await execute()) as UserDto;

    return set({ id, name: result.data.name });
  },
}));

export default useUserStore;
