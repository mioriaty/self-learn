import { TodoItem } from 'containers/Home/Todo';
import createState from 'utils/functions/createState';
import delay from 'utils/functions/delay';
import { v4 } from 'uuid';

const todoState = createState<TodoItem[]>([]);

async function getTodos() {
  await delay(500);
  return todoState.getState();
}

async function createTodo(name: string) {
  await delay(500);

  const newTodo: TodoItem = {
    id: v4(),
    name,
    active: false,
  };

  todoState.setState(prevState => [newTodo, ...prevState]);

  return newTodo;
}

export { createTodo, getTodos };
