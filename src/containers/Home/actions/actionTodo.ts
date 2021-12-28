import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'core';
import { TodoItem } from '../Todo';

export const createTodo = createAsyncAction(['@CreateTodo/request', '@CreateTodo/success', '@CreateTodo/failure'])<
  { name: string },
  { item: TodoItem },
  { message: string }
>();

export const getAllTodo = createAsyncAction(['@GetAllTodo/request', '@GetAllTodo/success', '@GetAllTodo/failure'])<
  undefined,
  { data: TodoItem[] },
  undefined
>();

export const changeTodoKey = createAction('@ChangeTodoKey', (search: string) => ({ search }));

export const useCreateTodo = createDispatchAsyncAction(createTodo);
export const useGetAllTodo = createDispatchAsyncAction(getAllTodo);
export const useChangeTodoKey = createDispatchAction(changeTodoKey);