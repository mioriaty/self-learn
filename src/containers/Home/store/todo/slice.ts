import { TodoItem } from 'services/Todo';
import reorder from 'utils/functions/reorder';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { ChangeSearchKey, createTodo, deleteTodo, getAllTodos, SetCurrentTodo, sortTodos, updateTodo } from './actions';

type TodoId = string;
type SearchKey = string;

type TodoActions = ChangeSearchKey | SetCurrentTodo;

type TodoExtraActions = ActionTypes<typeof getAllTodos | typeof createTodo | typeof deleteTodo | typeof updateTodo | typeof sortTodos>;

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
  currentTodo: TodoItem | undefined;
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
    currentTodo: undefined,
  },
  name: '@Todo',
  reducers: [
    handleAction('changeSearchKey', ({ state, action }) => {
      return {
        ...state,
        searchKey: action.payload,
      };
    }),
    handleAction('setCurrentTodo', ({ state, action }) => {
      return {
        ...state,
        currentTodo: action.payload,
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
                  id: action.payload.id,
                  active: action.payload.active ?? item.active,
                  content: action.payload.content ?? item.content,
                  label: action.payload.label ?? item.label,
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
    handleAction('@Todo/sortTodos/request', ({ state }) => ({ ...state })),
    handleAction('@Todo/sortTodos/success', ({ state, action }) => {
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
    handleAction('@Todo/sortTodos/failure', ({ state }) => ({ ...state })),
  ],
});

const { changeSearchKey, setCurrentTodo } = sliceTodo.actions;
const todoSelector = (state: AppState) => state.homePage.todo;

const useChangeSearchKey = createDispatchAction(changeSearchKey);
const useSetCurrentTodo = createDispatchAction(setCurrentTodo);

export { changeSearchKey, useChangeSearchKey, sliceTodo, todoSelector, useSetCurrentTodo };
