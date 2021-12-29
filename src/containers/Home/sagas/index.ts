import { watchCreateTodo } from './watchCreateTodo';
import { watchGetTodos } from './watchGetTodos';

export const sagasTodo = [watchGetTodos, watchCreateTodo];
