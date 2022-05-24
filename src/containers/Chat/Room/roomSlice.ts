import { createSlice, handleAction } from 'wiloke-react-core/utils';
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
  ],
});
