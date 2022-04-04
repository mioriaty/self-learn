import delay from 'utils/functions/delay';
import { v4 } from 'uuid';
import createState from 'utils/functions/createState';
import { ClientTodo, ServerTodoModel } from '.';

const initialState: ServerTodoModel = {
  status: 'success',
  data: [
    {
      id: v4(),
      content: 'Todo 1',
      active: false,
    },
    {
      id: v4(),
      content: 'Todo 2',
      active: true,
    },
  ],
};

const todoState = createState<ServerTodoModel>(initialState, {
  stateName: '__TODO__',
  useLocalStorage: true,
});

export async function getAllTodos() {
  await delay(400);
  return todoState.getState();
}

export async function addTodo(content: string) {
  await delay(400);
  const newTodo: ClientTodo = {
    id: v4(),
    content,
    active: false,
  };
  todoState.setState(prevState => {
    return {
      ...prevState,
      data: [newTodo, ...prevState.data],
    };
  });
  return newTodo;
}

export async function updateTodoActive(id: string) {
  await delay(400);
  return todoState.setState(prevState => {
    const updatedTodo = todoState.getState().data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          active: !item.active,
        };
      }
      return item;
    });
    return {
      ...prevState,
      data: updatedTodo,
    };
  });
}

export async function deleteTodoByIds(ids: string[]) {
  await delay(400);
  return todoState.setState(prevState => {
    return {
      ...prevState,
      data: prevState.data.filter(item => !ids.includes(item.id)),
    };
  });
}

export async function deleteTodoById(id: string) {
  await delay(400);
  return todoState.setState(prevState => {
    return {
      ...prevState,
      data: prevState.data.filter(item => item.id !== id),
    };
  });
}
