import { useEffect, useState } from 'react';
import useUsersStore from '../store/users.store.ts';
import { User } from '../store/user.store.ts';
import ReusableModal from './ReusableModal.tsx';

interface GroupChatModalProps {
  isOpen: boolean;
  closeModal: () => void;
  startChat: (users: User[], name: string) => void;
}
export default function GroupChatModal({ isOpen, closeModal, startChat }: GroupChatModalProps) {
  const { users, fetch } = useUsersStore((state) => state);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  function fetchUsers() {
    fetch();
  }

  useEffect(() => {
    setSelectedUsers([]);
    setGroupName('');
  }, []);

  function addUser(user: User) {
    setSelectedUsers([...selectedUsers, user]);
  }
  function removeUser(user: User) {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  }

  return (
    <ReusableModal isOpen={isOpen} onOpen={() => fetchUsers()} closeModal={closeModal}>
      <h1 className="pb-4">Start a group chat</h1>
      <input
        type="text"
        className="w-full"
        placeholder="Group Name"
        onInput={(e) => setGroupName(e.currentTarget.value)}
      />
      <ul>
        {users.map((user, n) => (
          <li key={user.id} className="">
            <label htmlFor={`checkbox${n}`} className="flex p-4 border-b gap-2">
              <input
                name="checkbox"
                type="checkbox"
                id={`checkbox${n}`}
                onInput={(e) => {
                  if (e.currentTarget.checked) {
                    addUser(user);
                  } else {
                    removeUser(user);
                  }
                }}
              />
              <span className="block w-full text-start">{user.name}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="block btn m-auto mt-4"
        onClick={() => {
          startChat(selectedUsers, groupName);
        }}
        disabled={selectedUsers.length < 2 || groupName.length === 0}
      >
        Start Chatting!
      </button>
    </ReusableModal>
  );
}
