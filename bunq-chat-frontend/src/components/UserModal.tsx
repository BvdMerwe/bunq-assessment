import Modal from 'react-modal';
import useUsersStore from '../store/users.store.ts';
import { User } from '../store/user.store.ts';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectUser: (user: User) => void;
}
export default function UserModal({ isOpen, closeModal, selectUser }: ModalProps) {
  const { users, fetch } = useUsersStore((state) => state);
  function fetchUsers() {
    fetch();
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => fetchUsers()}
      onRequestClose={closeModal}
      contentLabel="Select a user"
      appElement={document.getElementById('root') as HTMLElement}
      overlayClassName="fixed inset-0 flex justify-center items-center bg-black/50"
      className="min-w-[300px] max-w-[300px] m-auto bg-white rounded-xl shadow-xl p-4"
    >
      <h1 className="pb-4">Pick someone to chat with</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="">
            <button
              type="button"
              className="block w-full text-start p-4 border-t hover:bg-black/10 cursor-pointer"
              onClick={() => selectUser(user)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
