import { UserDto } from './user.dto.ts';

export interface ConversationDto {
  id?: number;
  name?: string;
  members?: UserDto[];
  last_message?: string;
}
