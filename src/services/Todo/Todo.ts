import { createTodo, getTodos, editTodo } from './fakeBackend';

export class TodoService {
  async getTodos(search: string) {
    try {
      const response = await getTodos(search);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(name: string) {
    try {
      const response = await createTodo(name);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async editTodo(id: string) {
    try {
      const response = await editTodo(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
