import { combineReducers } from 'redux';
import { reducerTodo } from './reducerTodo';

export const reducerHomePage = combineReducers({
  reducerTodo,
});
