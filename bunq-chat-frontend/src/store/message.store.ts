import { create } from 'zustand';
import Environment from '../utils/environment.ts';

export interface MessageStore {
  messages: any[];
  fetch: (conversationId: number) => Promise<void>;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  fetch: async (conversationId: number) => {
    const result = await fetch(
      `${Environment.apiBaseUrl}/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}/message`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    return set({ messages: result.data });
  },
}));

export default useMessageStore;
