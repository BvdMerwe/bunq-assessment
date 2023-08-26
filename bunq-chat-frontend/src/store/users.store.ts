import { create } from 'zustand';
import { User } from './user.store.ts';
import Environment from '../utils/environment.ts';

export interface Users {
  users: User[];
  fetch: () => Promise<void>;
}

const useUsersStore = create<Users>((set) => ({
  users: [],
  fetch: async () => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data.data as User[])
      .catch((err) => {
        console.error(err);
        throw err;
      });

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
