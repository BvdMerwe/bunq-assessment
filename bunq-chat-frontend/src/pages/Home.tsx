import { useEffect } from 'react';
import Sidebar from '../components/Sidebar.tsx';
import MessageBox from '../components/MessageBox.tsx';
import Message from '../components/Message.tsx';
import useConversationStore from '../store/conversation.store.ts';
import useMessageStore from '../store/message.store.ts';

export default function HomePage() {
  const { conversation } = useConversationStore((state) => state);
  const { messages, fetch } = useMessageStore((state) => state);

  useEffect(() => {
    fetch(conversation?.id!);
  }, [conversation]);
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      <div className="grid grid-rows-[80px_1fr_100px]">
        {conversation != null ? (
          <div className="p-2 border-b">
            {' '}
            <h1 className="text-2xl">{conversation.name}</h1>
            <p className="text-black/50"> {conversation.members.length} members</p>
          </div>
        ) : (
          <div className="flex justify-center items-center text-2xl h-full">Welcome to chat</div>
        )}
        <div className="overflow-scroll max-h-[calc(100vh-180px)]">
          <div className="messages flex flex-col justify-end gap-2 p-2 border-b">
            {messages.map((message) => (
              <Message name="Me" message={message.text} timestamp={message.sent_at} isMe key={message.id} />
            ))}
            {/* <Message message="Hello world" timestamp="19:55" name="Melvin" /> */}
          </div>
        </div>
        <MessageBox />
      </div>
    </div>
  );
}
