import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoInputModel, TodoModel, Todos } from './todo.model';
const TodosList: Record<Todos, TodoModel[]> = {
  reload: [],
  refetch: [],
  cache: [],
  optimistic: [],
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class TodoService {
  async get(type: Todos): Promise<TodoModel[]> {
    await wait(2000);
    return TodosList[type];
  }

  async add({
    type,
    title,
  }: CreateTodoInputModel & { type: Todos }): Promise<TodoModel> {
    await wait(2000);
    const newTodo = { id: uuidv4(), title };
    TodosList[type].unshift(newTodo);
    return newTodo;
  }

  async remove({ type, id }: { type: Todos; id: string }): Promise<TodoModel> {
    await wait(2000);
    const index = TodosList[type].findIndex((todo) => todo.id === id);
    const [removedTodo] = TodosList[type].splice(index, 1);
    return removedTodo;
  }
}
