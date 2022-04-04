import { TodoItem } from '.';
import { addTodo, deleteTodoById, deleteTodoByIds, getAllTodos, updateTodo } from './fakeApi';

export class TodoService {
  public async getTodo() {
    const response = await getAllTodos();
    return response.data;
  }

  public async addTodo(content: string, label: string) {
    const newItem = await addTodo(content, label);
    return newItem;
  }

  public async deleteTodos(ids: string[]) {
    await deleteTodoByIds(ids);
  }

  public async deleteTodo(id: string) {
    await deleteTodoById(id);
  }

  public async updateTodo({ id, active, content, label }: AtLeast<TodoItem, 'id'>) {
    await updateTodo({ id, active, content, label });
  }
}
