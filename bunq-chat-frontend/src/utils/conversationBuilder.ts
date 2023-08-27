import { User } from '../store/user.store.ts';
import { Message } from '../store/message.store.ts';
import { Conversation } from '../store/conversation.store.ts';

export default function conversationBuilder(data: any): Conversation {
  const currentUserId = localStorage.getItem('userId');
  return {
    id: data.id ?? 0,
    name: data.name ?? '',
    members: data.members?.map((m: User) => m).filter((m: User) => m.id.toString() !== currentUserId) ?? [],
    last_message: data.last_message
      ? <Message>{
          id: data.last_message.id,
          user_id: data.last_message.user_id,
          message: data.last_message.text,
          sent_at: new Date(data.last_message.sent_at ?? ''),
        }
      : null,
  };
}
