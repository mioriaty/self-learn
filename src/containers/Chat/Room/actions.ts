import { ImageToUse, Message, Room, RoomState } from './types';

// message
export interface AddMessageToRoom {
  type: 'addMessageToRoom';
  payload: {
    room_index: number;
    message: Message[];
  };
}

export interface DeleteMessageInRoom {
  type: 'deleteMessageInRoom';
  payload: {
    room_index: number;
    message: Message;
  };
}

export interface UpdateRoomMessage {
  type: 'updateRoomMessage';
  payload: Room;
}

export interface UpdateViewMessage {
  type: 'updateViewMessage';
  payload: Message;
}

// room
export interface CreateRoom {
  type: 'createRoom';
  payload: Room;
}

export interface SetRoomLoading {
  type: 'setRoomLoading';
  payload: boolean;
}

export interface EmptyRooms {
  type: 'emptyRooms';
}

export interface SetUserRooms {
  type: 'setUserRooms';
  payload: RoomState;
}

// image
export interface UpdateImage {
  type: 'updateImage';
  payload: {
    image: ImageToUse;
  };
}
