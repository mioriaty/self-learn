export interface TodoItem {
  id: string;
  active: boolean;
  content: string;
}

export interface ServerTodoModel {
  status: 'loading' | 'success' | 'failure';
  data: TodoItem[];
}
