import { combineReducers } from 'redux';
import { roomSlice } from './Room/roomSlice';
import { userSlice } from './User/userSlice';

export const chatReducer = combineReducers({
  user: userSlice.reducer,
  room: roomSlice.reducer,
});
