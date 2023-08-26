import { FiSend } from 'react-icons/fi';

export default function MessageBox() {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 grid-cols-[1fr_50px]">
      <textarea className="w-full h-full m-0 p-3 rounded-[10px] outline-0 border" />
      <button type="button" className="btn btn-rounded min-w-[50px] min-h-[50px]">
        <FiSend />
      </button>
    </div>
  );
}
