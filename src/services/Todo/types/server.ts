export interface TodoItem {
  id: string;
  active: boolean;
  content: string;
  label: string;
}

export interface ServerTodoModel {
  status: 'loading' | 'success' | 'failure';
  data: TodoItem[];
}
