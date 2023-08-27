import { User } from '../store/user.store.ts';
import MessageDto from './message.dto.ts';

export interface ConversationDto {
  id?: number;
  name?: string;
  members?: User[];
  last_message?: MessageDto;
}
