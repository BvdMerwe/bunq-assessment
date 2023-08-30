import { create } from 'zustand';
import ApiClient from '../utils/ApiClient.ts';
import MessageDto from '../types/message.dto.ts';

export interface Message {
  id: number;
  user_id: number;
  message: string;
  sent_at: Date;
}
export interface MessageStore {
  messages: Message[];
  fetch: (conversationId: number) => Promise<void>;
  addMessage: (message: Message) => void;
  send: (conversationId: number, message: string) => Promise<Message>;
  clear: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  fetch: async (conversationId: number) => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}/message`,
    });
    const result = (await execute()).data as MessageDto[];

    return set({
      messages: result.map(
        (m) =>
          <Message>{
            id: m.id,
            user_id: m.user_id,
            message: m.text,
            sent_at: new Date(m.sent_at ?? ''),
          },
      ),
    });
  },
  addMessage: (message: Message) => set((state) => ({ messages: [message, ...state.messages] })),
  send: async (conversationId: number, message: string) => {
    const { execute } = ApiClient({
      method: 'POST',
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}/message`,
      body: { text: message },
    });
    const result = (await execute()).data as MessageDto;

    return <Message>{
      id: result.id,
      user_id: result.user_id,
      message: result.text,
      sent_at: new Date(result.sent_at ?? ''),
    };
  },
  clear: () => set({ messages: [] }),
}));

export default useMessageStore;
