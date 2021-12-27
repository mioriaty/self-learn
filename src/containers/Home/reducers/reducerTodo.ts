import { ActionTypes, createReducer, handleAction } from 'core';
import { createTodo, getAllTodo } from '../actions/actionTodo';
import { TodoItem } from '../Todo';

type Actions = ActionTypes<typeof createTodo | typeof getAllTodo>;

interface State {
  data: TodoItem[];
  createStatus: Status;
  getStatus: Status;
  message: string;
}

const defaultState: State = {
  createStatus: 'idle',
  getStatus: 'idle',
  data: [],
  message: '',
};

export const reducerTodo = createReducer<State, Actions>(defaultState, [
  handleAction('@CreateTodo/request', ({ state }) => {
    return {
      ...state,
      createStatus: 'loading',
    };
  }),
  handleAction('@CreateTodo/success', ({ state, action }) => {
    return {
      ...state,
      createStatus: 'success',
      data: [action.payload.item, ...state.data],
    };
  }),
  handleAction('@CreateTodo/failure', ({ state, action }) => {
    return {
      ...state,
      createStatus: 'failure',
      message: action.payload.message,
    };
  }),
]);
