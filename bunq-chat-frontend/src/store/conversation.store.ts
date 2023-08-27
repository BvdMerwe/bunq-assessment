import { create } from 'zustand';
import { User } from './user.store.ts';
import { ConversationDto } from '../types/conversation.dto.ts';
import Environment from '../utils/environment.ts';
import ApiClient from '../utils/ApiClient.ts';

export interface Conversation {
  id: number;
  name: string;
  members: User[];
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
    const result = await execute();

    return set({
      conversations: result.data.map(
        (conversation: ConversationDto) =>
          <Conversation>{
            id: conversation.id,
            name: conversation.name,
            members:
              conversation.members?.map((m) => ({
                id: m.data.id,
                name: m.data.name,
              })) ?? [],
          },
      ) as Conversation[],
    });
  },
  fetch: async (conversationId) => {
    const { execute } = ApiClient({
      authenticated: true,
      path: `/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}`,
    });
    const result = await execute();

    return set({
      conversation: {
        id: result.id ?? 0,
        name: result.name ?? '',
        members:
          result.members?.map(
            (m: User) =>
              ({
                id: m.id,
                name: m.name,
                last_seen_at: m.last_seen_at,
              }) as User,
          ) ?? [],
      },
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
    const result = await execute();

    set({
      conversation: {
        id: result.id ?? 0,
        name: result.name ?? user.name,
        members:
          result.members?.map(
            (m: User) =>
              <User>{
                id: m.id,
                name: m.name,
              },
          ) ?? [],
      },
    });
  },
  startGroup: async (users, name) => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user/1/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        userIds: [users.map((u) => u.id)],
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.data as ConversationDto)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    set({
      conversation: {
        id: result.id ?? 0,
        name: result.name ?? '',
        members:
          result.members?.map(
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
