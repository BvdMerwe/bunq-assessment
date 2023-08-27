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
    const result = (await execute()) as User[];

    return set({
      users: result.map(
        (user: User) =>
          <User>{
            id: user.id,
            name: user.name,
            last_seen_at: user.last_seen_at,
          },
      ),
    } as Users);
  },
}));

export default useUsersStore;
