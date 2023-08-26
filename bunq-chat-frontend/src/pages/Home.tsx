import { Link } from 'react-router-dom';
import { FiLogOut, FiPlus, FiSend, FiUser } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="max-w-[250px] border-r grid gap-2 grid-rows-2">
        <div className="flex flex-col gap-2">
          <Link to="/app" className="p-2 px-5 border-b">
            <FiUser className="me-2" />
            <span>Melvin</span>
            <span className="text-xs ms-2 text-black/50">(2m ago)</span>
          </Link>
          <Link to="/app" className="p-2 px-5 border-b">
            <FiPlus className="me-2" />
            New Conversation
          </Link>
        </div>
        <div className="flex flex-col gap-2 self-end ">
          <Link to="/logout" className="p-2 px-5 border-t">
            <FiLogOut className="me-2" />
            Logout
          </Link>
        </div>
      </div>
      <div className="grid grid-rows-[1fr_100px]">
        <div className="messages flex flex-col justify-end gap-2 p-2 border-b">
          <div className="message me">
            <div className="body">
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum
              </span>
              <span className="timestamp">19:55</span>
            </div>
          </div>
          <div className="message you">
            <div className="body">
              <span>Hello world</span>
              <span className="timestamp">19:55</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-50 grid-cols-[1fr_50px]">
          <textarea className="w-full h-full m-0 p-3 rounded-[10px] outline-0 border" />
          <button type="button" className="btn btn-rounded min-w-[50px] min-h-[50px]">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
