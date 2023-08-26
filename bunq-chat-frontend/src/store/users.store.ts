import { create } from 'zustand';
import { User } from './user.store.ts';
import { UsersDto } from '../types/users.dto.ts';
import { UserDto } from '../types/user.dto.ts';

export interface Users {
  users: User[];
}

const useUsersStore = create<Users>((set) => ({
  users: [],
  fetch: async () => {
    const result: UsersDto = await fetch(`${Environment.apiBaseUrl}/api/user`)
      .then((response) => response.json())
      .then((data: UsersDto) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    return set({
      users: result.data.map(
        (user: UserDto) =>
          <User>{
            id: user.data.id,
            name: user.data.name,
            last_seen_at: user.data.last_seen_at,
          },
      ),
    } as Users);
  },
}));

export default useUsersStore;
