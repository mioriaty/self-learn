import { UserState } from '../User/types';

export interface Room {
  room: number;
  users: UserState[];
  messages: Message[];
  index?: number;
}

export interface RoomState {
  rooms: Room[];
  isLoading?: boolean;
}

export interface ImageToUse {
  id?: number;
  created_at: Date;
  message_id: number;
  message_room_id: number;
  message_user_id: string;
  url: string;
}

export interface Message {
  id?: number;
  created_at: Date;
  content: string;
  room: number;
  user: string;
  view?: boolean;
  images?: ImageToUse[];
}
