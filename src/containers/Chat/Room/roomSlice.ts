import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { RoomState } from './types';
import {
  UpdateImage,
  AddMessageToRoom,
  DeleteMessageInRoom,
  CreateRoom,
  UpdateRoomMessage,
  UpdateViewMessage,
  EmptyRooms,
  SetRoomLoading,
  SetUserRooms,
} from './actions';

type RoomActions =
  | UpdateImage
  | AddMessageToRoom
  | DeleteMessageInRoom
  | CreateRoom
  | UpdateRoomMessage
  | UpdateViewMessage
  | EmptyRooms
  | SetRoomLoading
  | SetUserRooms;

const initialState: RoomState = {
  rooms: [],
  isLoading: true,
};

export const roomSlice = createSlice<RoomState, RoomActions>({
  initialState,
  name: '@Room',
  reducers: [
    handleAction('emptyRooms', () => ({
      ...initialState,
    })),
    handleAction('setRoomLoading', ({ state, action }) => ({
      ...state,
      isLoading: action.payload,
    })),
    handleAction('setUserRooms', ({ state, action }) => {
      return { ...state, rooms: action.payload.rooms, isLoading: false };
    }),
    handleAction('createRoom', ({ state, action }) => {
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        isLoading: false,
      };
    }),
    handleAction('updateRoomMessage', ({ state, action }) => {
      const { index } = action.payload;
      const _rooms = [...state.rooms];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const viewedMessages = _rooms[index!].messages.map(mess => {
        if (mess.view === false) {
          return {
            ...mess,
            view: true,
          };
        }
        return mess;
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      _rooms[index!] = { ...state.rooms[index!], messages: viewedMessages };
      return {
        ...state,
        rooms: _rooms,
      };
    }),
    handleAction('addMessageToRoom', ({ state, action }) => {
      const { message, room_index } = action.payload;
      const data = [...state.rooms];
      const room = data.findIndex(r => r.room === room_index);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data[room] = { ...state.rooms[room!], messages: [...message, ...state.rooms[room!].messages] };
      return {
        ...state,
        rooms: data,
      };
    }),
    handleAction('updateViewMessage', ({ state, action }) => {
      const { message, room_index } = action.payload;
      const data = [...state.rooms];
      const room = data.findIndex(r => r.room === room_index);
      const messageIndex = data[room].messages.findIndex(mes => mes.id === message[0].id);
      data[room].messages[messageIndex].view = true;
      return {
        ...state,
        rooms: data,
      };
    }),
    handleAction('updateImage', ({ state, action }) => {
      const { image } = action.payload;
      const data = [...state.rooms];
      const room = data.findIndex(r => r.room === image.message_room_id);
      const messageIndex = data[room].messages.findIndex(mess => mess.id === image.message_id);
      data[room].messages[messageIndex].images = [];
      data[room].messages[messageIndex].images?.push(image);
      return {
        ...state,
        rooms: data,
      };
    }),
  ],
});

export const {
  addMessageToRoom,
  createRoom,
  deleteMessageInRoom,
  emptyRooms,
  setRoomLoading,
  setUserRooms,
  updateImage,
  updateRoomMessage,
  updateViewMessage,
} = roomSlice.actions;

export const useAddMessageToRoom = createDispatchAction(addMessageToRoom);
export const useCreateRoom = createDispatchAction(createRoom);
export const useDeleteMessageInRoom = createDispatchAction(deleteMessageInRoom);
export const useEmptyRooms = createDispatchAction(emptyRooms);
export const useSetRoomLoading = createDispatchAction(setRoomLoading);
export const useSetUserRooms = createDispatchAction(setUserRooms);
export const useUpdateImage = createDispatchAction(updateImage);
export const useUpdateRoomMessage = createDispatchAction(updateRoomMessage);
export const useUpdateViewMessage = createDispatchAction(updateViewMessage);

export const roomSelector = (state: AppState) => state.chat.room;
