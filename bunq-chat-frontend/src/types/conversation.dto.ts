import { User } from '../store/user.store.ts';

export interface ConversationDto {
  id?: number;
  name?: string;
  members?: User[];
  last_message?: string;
}
