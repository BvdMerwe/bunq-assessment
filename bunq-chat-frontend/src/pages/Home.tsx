import { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Sidebar from '../components/Sidebar.tsx';
import MessageBox from '../components/MessageBox.tsx';
import Message from '../components/Message.tsx';
import useConversationStore from '../store/conversation.store.ts';
import useMessageStore from '../store/message.store.ts';
import useLoginStore from '../store/login.store.ts';
import useUsersStore from '../store/users.store.ts';

export default function HomePage() {
  const { conversation, loadingConversation } = useConversationStore((state) => state);
  const { messages, fetch, clear } = useMessageStore((state) => state);
  const { currentUser } = useLoginStore((state) => state);
  const usersStore = useUsersStore((state) => state);
  const [poll, setPoll] = useState(0);

  const messagesRef = useRef(null);
  const messagesContainerRef = useRef(null);

  function pollHandler() {
    fetch(conversation!.id);
  }

  useEffect(() => {
    clear();
    clearInterval(poll);
    if (conversation) {
      fetch(conversation.id).then(() => {
        setPoll(setInterval(pollHandler, 3000));
      });
    } else {
      clearInterval(poll);
    }
    return () => {
      clearInterval(poll);
    };
  }, [conversation]);

  useEffect(() => {
    const messageBox = messagesRef.current! as HTMLDivElement;
    const messagesContainer = messagesContainerRef.current! as HTMLDivElement;
    messagesContainer?.scrollTo({ top: messageBox.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    usersStore.fetch();
  }, []);

  return (
    <div className="grid grid-cols-[150px_1fr] md:grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      <div className="grid grid-rows-[80px_1fr_100px]">
        {conversation != null ? (
          <div className="p-2 border-b">
            {' '}
            <h1 className="text-2xl">
              {conversation.name ? conversation.name : conversation.members[0]?.name ?? 'empty'}{' '}
              {conversation.members.length > 1 && (
                <span className="text-black/50 text-xs">({conversation.members.length} members)</span>
              )}
            </h1>
            {conversation.members.length === 1 ? (
              <p className="text-black/50 text-sm">
                Last seen{' '}
                {conversation.members[0]?.last_seen_at
                  ? formatDistanceToNow(new Date(conversation.members[0]?.last_seen_at), { addSuffix: true })
                  : 'never'}
              </p>
            ) : (
              <ul className="text-black/50 text-sm flex flex-wrap gap-2 w-full block">
                {conversation!.members.map((member) => (
                  <li key={member.id}>{member.name}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center text-2xl h-full">Welcome to chat</div>
        )}

        <div ref={messagesContainerRef} className="overflow-scroll max-h-[calc(100vh-180px)]">
          <div ref={messagesRef} className="messages min-h-full flex flex-col-reverse justify-end gap-2 p-2 border-b">
            {messages.length > 1 ? (
              messages.map((message) => (
                <Message
                  name={
                    message.user_id === currentUser?.id
                      ? 'You'
                      : usersStore.users.find((user) => user.id === message.user_id)?.name
                  }
                  message={message.message}
                  timestamp={message.sent_at}
                  isMe={currentUser?.id === message.user_id}
                  key={message.id}
                />
              ))
            ) : (
              <>
                <div className="w-[120px] max-w-2xl h-[50px] rounded bg-gray-400 message me shimmer" />
                <div className="w-[300px] h-[70px] rounded bg-gray-400 message you shimmer" />
                <div className="w-[300px] h-[90px] rounded bg-gray-400 message me shimmer" />
              </>
            )}
          </div>
        </div>
        {conversation != null && <MessageBox />}
      </div>
    </div>
  );
}
