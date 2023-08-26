import { create } from 'zustand';
import { User } from './user.store.ts';
import { ConversationsDto } from '../types/conversations.dto.ts';
import { ConversationDto } from '../types/conversation.dto.ts';
import Environment from '../utils/environment.ts';

export interface Conversation {
  id: number;
  name: string;
  members: User[];
}
export interface ConversationsState {
  conversation: Conversation | null;
  conversations: Conversation[];
  fetchAll?: () => Promise<void>;
  startConversation?: (id: User) => Promise<void>;
  startGroup?: (users: User[], name: string) => Promise<void>;
}

const useConversationStore = create<ConversationsState>((set) => ({
  conversation: null,
  conversations: [],
  fetchAll: async () => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user/1/conversation`)
      .then((response) => response.json())
      .then((data: ConversationsDto) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    return set({
      conversations: result.data.map(
        (conversation) =>
          <Conversation>{
            id: conversation.data.id,
            name: conversation.data.name,
            members:
              conversation.data.members?.map((m) => ({
                id: m.data.id,
                name: m.data.name,
              })) ?? [],
          },
      ) as Conversation[],
    });
  },

  startConversation: async (user) => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user/1/conversation`, {
      method: 'POST',
      body: JSON.stringify({
        user_ids: [user.id],
      }),
    })
      .then((response) => response.json())
      .then((data: ConversationDto) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    set({
      conversation: {
        id: result.data.id ?? 0,
        name: result.data.name ?? user.name,
        members:
          result.data.members?.map(
            (m) =>
              <User>{
                id: m.data.id,
                name: m.data.name,
              },
          ) ?? [],
      },
    });
  },
  startGroup: async (users, name) => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user/1/conversation`, {
      method: 'POST',
      body: JSON.stringify({
        user_ids: [users.map((u) => u.id)],
        name,
      }),
    })
      .then((response) => response.json())
      .then((data: ConversationDto) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    set({
      conversation: {
        id: result.data.id ?? 0,
        name: result.data.name ?? '',
        members:
          result.data.members?.map(
            (m) =>
              <User>{
                id: m.data.id,
                name: m.data.name,
              },
          ) ?? [],
      },
    });
  },
}));

export default useConversationStore;
