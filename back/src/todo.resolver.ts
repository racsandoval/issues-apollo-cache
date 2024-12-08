import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoModel } from './todo.model';
import { CreateTodoInput, Todo } from './todo.type';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async reloadTodos(): Promise<TodoModel[]> {
    return this.todoService.get('reload');
  }

  @Mutation(() => Todo)
  async createReloadTodo(
    @Args('data') data: CreateTodoInput,
  ): Promise<TodoModel> {
    return this.todoService.add({ ...data, type: 'reload' });
  }

  @Mutation(() => Todo)
  async removeReloadTodo(@Args('id') id: string): Promise<TodoModel> {
    return this.todoService.remove({ type: 'reload', id });
  }

  @Query(() => [Todo])
  async refetchTodos(): Promise<TodoModel[]> {
    return this.todoService.get('refetch');
  }

  @Mutation(() => Todo)
  async createRefetchTodo(
    @Args('data') data: CreateTodoInput,
  ): Promise<TodoModel> {
    return this.todoService.add({ ...data, type: 'refetch' });
  }

  @Mutation(() => Todo)
  async removeRefetchTodo(@Args('id') id: string): Promise<TodoModel> {
    return this.todoService.remove({ type: 'refetch', id });
  }

  @Query(() => [Todo])
  async cacheTodos(): Promise<TodoModel[]> {
    return this.todoService.get('cache');
  }

  @Mutation(() => Todo)
  async createCacheTodo(
    @Args('data') data: CreateTodoInput,
  ): Promise<TodoModel> {
    return this.todoService.add({ ...data, type: 'cache' });
  }

  @Mutation(() => Todo)
  async removeCacheTodo(@Args('id') id: string): Promise<TodoModel> {
    return this.todoService.remove({ type: 'cache', id });
  }

  @Query(() => [Todo])
  async optimisticTodos(): Promise<TodoModel[]> {
    return this.todoService.get('optimistic');
  }

  @Mutation(() => Todo)
  async createOptimisticTodo(
    @Args('data') data: CreateTodoInput,
  ): Promise<TodoModel> {
    return this.todoService.add({ ...data, type: 'optimistic' });
  }

  @Mutation(() => Todo)
  async removeOptimisticTodo(@Args('id') id: string): Promise<TodoModel> {
    return this.todoService.remove({ type: 'optimistic', id });
  }
}
