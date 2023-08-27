import { create } from 'zustand';
import ApiClient from '../utils/ApiClient.ts';

export interface MessageStore {
  messages: any[];
  fetch: (conversationId: number) => Promise<void>;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  fetch: async (conversationId: number) => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}/message`,
    });
    const result = await execute();

    return set({ messages: result.data });
  },
}));

export default useMessageStore;
