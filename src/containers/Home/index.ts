import { combineReducers } from 'redux';
import { sliceTodo } from './store/todo/slice';

export * from './Home';
export * from './store/todo/actions';
export * from './store/todo/sagas/sagasTodo';
export * from './store/todo/slice';

export const reducerHome = combineReducers({
  todo: sliceTodo.reducer,
});
