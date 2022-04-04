import delay from 'utils/functions/delay';
import { addTodo, deleteTodoById, deleteTodoByIds, getAllTodos, updateTodoActive } from './fakeApi';

export class TodoService {
  public async getTodo() {
    const response = await getAllTodos();
    return response.data;
  }

  public async addTodo(content: string) {
    const newItem = await addTodo(content);
    return newItem;
  }

  public async updateTodoStatus(id: string) {
    await updateTodoActive(id);
  }

  public async deleteTodos(ids: string[]) {
    await deleteTodoByIds(ids);
  }

  public async deleteTodo(id: string) {
    await deleteTodoById(id);
  }

  public async updateTodo(_id: string, _title: string) {
    await delay(100);
  }
}
