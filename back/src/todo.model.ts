export type Todos = 'refetch' | 'cache' | 'optimistic' | 'reload';

export interface TodoModel {
  id: string;
  title: string;
}

export interface CreateTodoInputModel {
  title: string;
}
