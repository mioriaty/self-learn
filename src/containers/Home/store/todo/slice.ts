import { TodoItem } from 'services/Todo';
import reorder from 'utils/functions/reorder';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { ChangeSearchKey, createTodo, deleteTodo, getAllTodos, ReorderTodos, updateTodo } from './actions';

type TodoId = string;
type SearchKey = string;

type TodoActions = ChangeSearchKey | ReorderTodos;

type TodoExtraActions = ActionTypes<typeof getAllTodos | typeof createTodo | typeof deleteTodo | typeof updateTodo>;

interface TodoData {
  todos: TodoItem[];
  getTodos: Status;
  loadMoreTodos: Status;
  createTodo: Status;
  deleteTodo: Record<TodoId, Status>;
  updateTodo: Record<TodoId, Status>;
}

interface TodoState {
  searchKey: SearchKey;
  data: Record<SearchKey, undefined | TodoData>;
}

export const defaultTodoData: TodoData = {
  deleteTodo: {},
  updateTodo: {},
  createTodo: 'idle',
  getTodos: 'idle',
  loadMoreTodos: 'idle',
  todos: [],
};

const sliceTodo = createSlice<TodoState, TodoActions, TodoExtraActions>({
  initialState: {
    data: {},
    searchKey: '',
  },
  name: '@Todo',
  reducers: [
    handleAction('changeSearchKey', ({ state, action }) => {
      return {
        ...state,
        searchKey: action.payload,
      };
    }),
    handleAction('reorderTodos', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            todos: reorder(defaultData.todos, action.payload.srcIndex, action.payload.desIndex),
          },
        },
      };
    }),
  ],
  extraReducers: [
    // get all
    handleAction('@Todo/getAllTodos/request', ({ state }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            getTodos: 'loading',
          },
        },
      };
    }),
    handleAction('@Todo/getAllTodos/success', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            getTodos: 'success',
            todos: action.payload.todos,
          },
        },
      };
    }),
    handleAction('@Todo/getAllTodos/failure', ({ state }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            getTodos: 'failure',
          },
        },
      };
    }),

    // create
    handleAction('@Todo/createTodo/request', ({ state }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            createTodo: 'loading',
          },
        },
      };
    }),
    handleAction('@Todo/createTodo/success', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            createTodo: 'success',
            todos: [...defaultData.todos, action.payload.todo],
          },
        },
      };
    }),
    handleAction('@Todo/createTodo/failure', ({ state }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            createTodo: 'failure',
          },
        },
      };
    }),

    // delete
    handleAction('@Todo/deleteTodo/request', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            deleteTodo: {
              ...defaultData.deleteTodo,
              [action.payload.id]: 'loading',
            },
          },
        },
      };
    }),
    handleAction('@Todo/deleteTodo/success', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            deleteTodo: {
              ...defaultData.deleteTodo,
              [action.payload.id]: 'success',
            },
            todos: defaultData.todos.filter(item => item.id !== action.payload.id),
          },
        },
      };
    }),
    handleAction('@Todo/deleteTodo/failure', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            deleteTodo: {
              ...defaultData.deleteTodo,
              [action.payload.id]: 'failure',
            },
          },
        },
      };
    }),

    // update
    handleAction('@Todo/updateTodo/request', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            updateTodo: {
              ...defaultData.updateTodo,
              [action.payload.id]: 'loading',
            },
          },
        },
      };
    }),
    handleAction('@Todo/updateTodo/success', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            updateTodo: {
              ...defaultData.updateTodo,
              [action.payload.id]: 'success',
            },
            todos: defaultData.todos.map(item => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  ...action.payload,
                };
              }
              return item;
            }),
          },
        },
      };
    }),
    handleAction('@Todo/updateTodo/failure', ({ state, action }) => {
      const { data, searchKey } = state;
      const defaultData = data[searchKey] ?? defaultTodoData;
      return {
        ...state,
        data: {
          ...data,
          [searchKey]: {
            ...defaultData,
            updateTodo: {
              ...defaultData.updateTodo,
              [action.payload.id]: 'failure',
            },
          },
        },
      };
    }),
  ],
});

const { changeSearchKey, reorderTodos } = sliceTodo.actions;
const todoSelector = (state: AppState) => state.homePage.todo;

const useChangeSearchKey = createDispatchAction(changeSearchKey);
const useReorderTodos = createDispatchAction(reorderTodos);

export { changeSearchKey, useChangeSearchKey, sliceTodo, todoSelector, useReorderTodos };
