import { useState } from 'react';
import useUsersStore from '../store/users.store.ts';
import { User } from '../store/user.store.ts';
import ReusableModal from './ReusableModal.tsx';

interface UserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectUser: (user: User) => void;
}
export default function UserModal({ isOpen, closeModal, selectUser }: UserModalProps) {
  const { users, fetch } = useUsersStore((state) => state);

  function fetchUsers() {
    fetch();
  }

  return (
    <ReusableModal isOpen={isOpen} onOpen={() => fetchUsers()} closeModal={closeModal}>
      <h1 className="pb-4">Start a chat</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="">
            <button
              type="button"
              className="block w-full text-start hover:bg-black/10 cursor-pointer p-4 border-t"
              onClick={() => selectUser(user)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </ReusableModal>
  );
}
