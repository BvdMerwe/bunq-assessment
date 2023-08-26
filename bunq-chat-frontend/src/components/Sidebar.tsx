import { Link } from 'react-router-dom';
import { FiLogOut, FiPlus, FiUser } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import useConversationStore from '../store/conversation.store.ts';
import UserModal from './UserModal.tsx';
import { User } from '../store/user.store.ts';

export default function Sidebar() {
  const conversationStore = useConversationStore((state) => state);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    conversationStore.fetchAll();
  }, []);

  async function selectConversation(conversationId: number) {
    await conversationStore.fetch(conversationId);
    await conversationStore.fetchAll();
  }

  function startNewConversation(user: User) {
    conversationStore.startConversation!(user);
  }

  return (
    <div className="max-w-[250px] border-r grid gap-2 grid-rows-2">
      <div className="flex flex-col gap-2">
        {conversationStore.conversations.map((conversation) => (
          <button
            type="button"
            key={conversation.id}
            onClick={() => selectConversation(conversation.id)}
            className="p-2 px-5 border-b cursor-pointer text-start"
          >
            <FiUser className="me-2" />
            <span>{conversation.name}</span>
            <span className="text-xs ms-2 text-black/50">{conversation.members.length}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            setOpenModal(true);
          }}
          className="p-2 px-5 border-b cursor-pointer text-start"
        >
          <FiPlus className="me-2" />
          <span>New Conversation</span>
        </button>
      </div>
      <div className="flex flex-col gap-2 self-end ">
        <Link to="/logout" className="p-2 px-5 border-t">
          <FiLogOut className="me-2" />
          Logout
        </Link>
      </div>
      <UserModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        selectUser={(user) => {
          console.log(user);
          startNewConversation(user);
        }}
      />
    </div>
  );
}
