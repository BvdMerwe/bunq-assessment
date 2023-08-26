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
  fetchAll: () => Promise<void>;
  fetch: (conversationId: number) => Promise<void>;
  startConversation?: (user: User) => Promise<void>;
  startGroup?: (users: User[], name: string) => Promise<void>;
}

const useConversationStore = create<ConversationsState>((set) => ({
  conversation: null,
  conversations: [],
  fetchAll: async () => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user/1/conversation`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data: ConversationsDto) => data)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    return set({
      conversations: result.data.map(
        (conversation) =>
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
    const result = await fetch(
      `${Environment.apiBaseUrl}/api/user/${localStorage.getItem('userId')}/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => data.data as ConversationDto)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    return set({
      conversation: {
        id: result.id ?? 0,
        name: result.name ?? '',
        members:
          result.members?.map(
            (m) =>
              ({
                id: m.data.id,
                name: m.data.name,
                last_seen_at: m.data.last_seen_at,
              }) as User,
          ) ?? [],
      },
    });
  },

  startConversation: async (user) => {
    const result = await fetch(`${Environment.apiBaseUrl}/api/user/1/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        userIds: [user.id],
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
        name: result.name ?? user.name,
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
