import { create } from 'zustand';
import ApiClient from '../utils/ApiClient.ts';
import { UserDto } from '../types/user.dto.ts';

export interface User {
  id: number;
  name: string;
  last_seen_at?: Date;
}

export interface UserStore {
  user: User | null;
  fetch: (id: number) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetch: async (id: number) => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}`,
    });
    const result = (await execute()).data as UserDto;

    return set({ user: { id, name: result.name ?? '', last_seen_at: new Date(result.last_seen_at!) } });
  },
}));

export default useUserStore;
