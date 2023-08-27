import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import useMessageStore from '../store/message.store.ts';
import useConversationStore from '../store/conversation.store.ts';
import useLoginStore from '../store/login.store.ts';

export default function MessageBox() {
  const { currentUser } = useLoginStore((state) => state);
  const { conversation } = useConversationStore((state) => state);
  const { send, fetch, addMessage } = useMessageStore((state) => state);
  const [message, setMessage] = useState('');

  async function sendMessage() {
    if (conversation && message) {
      setMessage('');
      addMessage({
        id: Math.random(),
        message,
        sent_at: new Date(0),
        user_id: currentUser?.id ?? 0,
      });
      await send(conversation.id, message);
      fetch(conversation.id);
    }
  }
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 grid-cols-[1fr_50px]">
      <textarea
        className="w-full h-full m-0 p-3 rounded-[10px] outline-0 border"
        value={message}
        onInput={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <button type="button" className="btn btn-rounded min-w-[50px] min-h-[50px]" onClick={sendMessage}>
        <FiSend />
      </button>
    </div>
  );
}
