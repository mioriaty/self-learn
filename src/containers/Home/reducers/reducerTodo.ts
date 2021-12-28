import { ActionTypes, createReducer, handleAction } from 'core';
import { changeTodoKey, createTodo, getAllTodo } from '../actions/actionTodo';
import { TodoItem } from '../Todo';

type Actions = ActionTypes<typeof createTodo | typeof getAllTodo | typeof changeTodoKey>;
type SearchKey = string;

export interface TodoState {
  todos: Record<SearchKey, undefined | DataState>;
  searchKey: string;
}

export interface DataState {
  data: TodoItem[];
  createStatus: Status;
  getStatus: Status;
  message: string;
}

export const defaultTodoData: DataState = {
  createStatus: 'idle',
  getStatus: 'idle',
  data: [],
  message: '',
};

const initialState: TodoState = {
  todos: {},
  searchKey: '',
};

export const reducerTodo = createReducer<TodoState, Actions>(initialState, [
  handleAction('@ChangeTodoKey', ({ state, action }) => {
    return {
      ...state,
      searchKey: action.payload.search,
    };
  }),
  handleAction('@GetAllTodo/request', ({ state }) => {
    const { searchKey } = state;
    return {
      ...state,
      todos: {
        ...state.todos,
        [searchKey]: {
          ...(state.todos[searchKey] ?? defaultTodoData),
          getStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@GetAllTodo/success', ({ state, action }) => {
    const { searchKey } = state;
    const { data } = action.payload;
    return {
      ...state,
      todos: {
        ...state.todos,
        [searchKey]: {
          ...(state.todos[searchKey] ?? defaultTodoData),
          getStatus: 'success',
          data,
        },
      },
    };
  }),
  handleAction('@GetAllTodo/failure', ({ state }) => {
    const { searchKey } = state;
    return {
      ...state,
      todos: {
        ...state.todos,
        [searchKey]: {
          ...(state.todos[searchKey] ?? defaultTodoData),
          getStatus: 'failure',
        },
      },
    };
  }),
  handleAction('@CreateTodo/request', ({ state }) => {
    const { searchKey } = state;
    return {
      ...state,
      todos: {
        ...state.todos,
        [searchKey]: {
          ...(state.todos[searchKey] ?? defaultTodoData),
          createStatus: 'loading',
        },
      },
    };
  }),
  handleAction('@CreateTodo/success', ({ state, action }) => {
    const { searchKey } = state;
    const { item } = action.payload;
    return {
      ...state,
      todos: {
        ...state.todos,
        [searchKey]: {
          ...(state.todos[searchKey] ?? defaultTodoData),
          createStatus: 'success',
          data: [...(state.todos[searchKey] ?? defaultTodoData).data, item],
        },
      },
    };
  }),
  handleAction('@CreateTodo/failure', ({ state }) => {
    const { searchKey } = state;
    return {
      ...state,
      todos: {
        ...state.todos,
        [searchKey]: {
          ...(state.todos[searchKey] ?? defaultTodoData),
          createStatus: 'failure',
        },
      },
    };
  }),
]);
