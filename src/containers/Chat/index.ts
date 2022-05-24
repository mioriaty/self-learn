import { combineReducers } from 'redux';
import { userSlice } from './User/userSlice';

export const chatReducer = combineReducers({
  user: userSlice.reducer,
});
