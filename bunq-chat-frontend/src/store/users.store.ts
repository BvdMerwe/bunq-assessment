import { create } from 'zustand';
import { User } from './user.store.ts';
import ApiClient from '../utils/ApiClient.ts';

export interface Users {
  users: User[];
  fetch: () => Promise<void>;
}

const useUsersStore = create<Users>((set) => ({
  users: [],
  fetch: async () => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user`,
    });
    const result = (await execute()).data as User[];
    const currentUserId = localStorage.getItem('userId');

    return set({
      users: result
        .filter((m: User) => m.id.toString() !== currentUserId)
        .map(
          (user: User) =>
            <User>{
              id: user.id,
              name: user.name,
              last_seen_at: user.last_seen_at,
            },
        ),
    });
  },
}));

export default useUsersStore;
