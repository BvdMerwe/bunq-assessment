import Sidebar from '../components/Sidebar.tsx';
import MessageBox from '../components/MessageBox.tsx';
import Message from '../components/Message.tsx';

export default function HomePage() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      <div className="grid grid-rows-[1fr_100px]">
        <div className="messages flex flex-col justify-end gap-2 p-2 border-b">
          <Message
            name="Me"
            message={`"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."`}
            timestamp="19:55"
            isMe
          />
          <Message message="Hello world" timestamp="19:55" name="Melvin" />
        </div>
        <MessageBox />
      </div>
    </div>
  );
}
