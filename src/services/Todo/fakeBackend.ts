import { TodoItem } from 'containers/Home/Todo';
import createState from 'utils/functions/createState';
import delay from 'utils/functions/delay';
import { v4 } from 'uuid';

const todoState = createState<TodoItem[]>([]);

async function getTodos(search: string) {
  await delay(500);
  return todoState.getState().filter(item => item.name.includes(search));
}

async function createTodo(name: string) {
  await delay(500);

  const newItem: TodoItem = {
    id: v4(),
    name,
    active: false,
  };

  todoState.setState(prevState => [newItem, ...prevState]);

  return newItem;
}

async function editTodo(id: string) {
  await delay(500);
  return id;
}

export { createTodo, getTodos, editTodo };
