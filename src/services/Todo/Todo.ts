import delay from 'utils/functions/delay';
import { createTodo, getTodos } from './fakeBackend';

export class TodoService {
  async getTodos() {
    try {
      const response = await getTodos();
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
}
