import { create } from 'zustand';
import { User } from './user.store.ts';
import { ConversationDto } from '../types/conversation.dto.ts';
import ApiClient from '../utils/ApiClient.ts';
import { Message } from './message.store.ts';
import conversationBuilder from '../utils/conversationBuilder.ts';

export interface Conversation {
  id: number;
  name: string;
  members: User[];
  last_message: Message | null;
}
export interface ConversationsState {
  conversation: Conversation | null;
  conversations: Conversation[];
  fetchAll: () => Promise<void>;
  fetch: (conversationId: number) => Promise<void>;
  startConversation?: (user: User) => Promise<void>;
  startGroup?: (users: User[], name: string) => Promise<void>;
}

const useConversationStore = create<ConversationsState>((set) => ({
  conversation: null,
  conversations: [],
  fetchAll: async () => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation`,
    });
    const result = (await execute()).data as ConversationDto[];

    return set({
      conversations: result.map((conversation: ConversationDto) => conversationBuilder(conversation)) as Conversation[],
    });
  },
  fetch: async (conversationId) => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}`,
    });
    const result = (await execute()).data as ConversationDto;

    return set({
      conversation: conversationBuilder(result),
    });
  },

  startConversation: async (user) => {
    const { execute } = ApiClient({
      method: 'POST',
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation`,
      body: {
        userIds: [user.id],
      },
    });
    const result = (await execute()).data as ConversationDto;

    set({
      conversation: conversationBuilder(result),
    });
  },
  startGroup: async (users, name) => {
    const { execute } = ApiClient({
      method: 'POST',
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation`,
      body: {
        userIds: users.map((u) => u.id),
        name,
      },
    });
    const result = (await execute()).data as ConversationDto;

    set({
      conversation: conversationBuilder(result),
    });
  },
}));

export default useConversationStore;
