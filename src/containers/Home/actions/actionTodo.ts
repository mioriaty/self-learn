import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'core';
import { TodoItem } from '../Todo';

export const createTodo = createAsyncAction(['@CreateTodo/request', '@CreateTodo/success', '@CreateTodo/failure'])<
  { name: string },
  { item: TodoItem },
  { message: string }
>();

export const getAllTodo = createAsyncAction(['@GetAllTodo/request', '@GetAllTodo/success', '@GetAllTodo/failure'])<
  { search: string },
  { data: TodoItem[] },
  undefined
>();

export const editTodoName = createAction('@EditTodoName', (id: string, newName: string) => ({ id, newName }));

export const changeTodoKey = createAction('@ChangeTodoKey', (search: string) => ({ search }));

export const useCreateTodo = createDispatchAsyncAction(createTodo);
export const useGetAllTodo = createDispatchAsyncAction(getAllTodo);
export const useChangeTodoKey = createDispatchAction(changeTodoKey);
export const useEditTodoName = createDispatchAction(editTodoName);
