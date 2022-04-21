import { TodoItem } from 'services/Todo';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export interface ChangeSearchKey {
  type: 'changeSearchKey';
  payload: string;
}

export interface SetCurrentTodo {
  type: 'setCurrentTodo';
  payload: TodoItem | undefined;
}

export const getAllTodos = createAsyncAction(['@Todo/getAllTodos/request', '@Todo/getAllTodos/success', '@Todo/getAllTodos/failure'])<
  { searchKey: string },
  { todos: TodoItem[] },
  undefined
>();

export const createTodo = createAsyncAction(['@Todo/createTodo/request', '@Todo/createTodo/success', '@Todo/createTodo/failure'])<
  { todo: Omit<TodoItem, 'id'>; callback?: () => void },
  { todo: TodoItem },
  undefined
>();

export const deleteTodo = createAsyncAction(['@Todo/deleteTodo/request', '@Todo/deleteTodo/success', '@Todo/deleteTodo/failure'])<
  { id: string },
  { id: string },
  { id: string }
>();

export const updateTodo = createAsyncAction(['@Todo/updateTodo/request', '@Todo/updateTodo/success', '@Todo/updateTodo/failure'])<
  AtLeast<TodoItem, 'id'>,
  AtLeast<TodoItem, 'id'>,
  { id: string }
>();

export const sortTodos = createAsyncAction(['@Todo/sortTodos/request', '@Todo/sortTodos/success', '@Todo/sortTodos/failure'])<
  { srcIndex: number; desIndex: number },
  { srcIndex: number; desIndex: number },
  undefined
>();

export const useGetAllTodos = createDispatchAsyncAction(getAllTodos);
export const useCreateTodo = createDispatchAsyncAction(createTodo);
export const useDeleteTodo = createDispatchAsyncAction(deleteTodo);
export const useUpdateTodo = createDispatchAsyncAction(updateTodo);
export const useSortTodos = createDispatchAsyncAction(sortTodos);