import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { CreateTodoInputModel, TodoModel } from './todo.model';

@ObjectType()
export class Todo implements TodoModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;
}

@InputType()
export class CreateTodoInput implements CreateTodoInputModel {
  @Field()
  title: string;
}
