import { CREATE_OPTIMISTIC_TODO, GET_OPTIMISTIC_TODO, REMOVE_OPTIMISTIC_TODO } from "@/data/gql";
import { useMutation, useQuery } from "@apollo/client";
import { Todo, TodoList } from "./todo-list";

export const OptimisticTodo = () => {
  const { data, loading } = useQuery(GET_OPTIMISTIC_TODO);

  const [createOptimisticTodo] = useMutation(CREATE_OPTIMISTIC_TODO, {
    update: (cache, { data }) => {
      cache.updateQuery({
        query: GET_OPTIMISTIC_TODO,
      }, todos => {
        if (!todos) return;

        const isTemp = data.createOptimisticTodo.id === 'temp-id';

        return {
          optimisticTodos: [{
            ...data.createOptimisticTodo,
            entryAnimated: isTemp,
            exitAnimated: !isTemp,
          }, ...todos.optimisticTodos]
        }
      })
    }
  });

  const [removeOptimisticTodo] = useMutation(REMOVE_OPTIMISTIC_TODO, {
    update: (cache, { data }) => {
      cache.updateQuery({
        query: GET_OPTIMISTIC_TODO,
      }, todos => {
        if (!todos) return;
        return {
          optimisticTodos: todos.optimisticTodos.filter((todo: Todo) => todo.id !== data.removeOptimisticTodo.id)
        }
      })
    }
  });

  const createTodo = (title: string) => {
    createOptimisticTodo({
      variables: {
        data: {
          title
        }
      },
      optimisticResponse: {
        createOptimisticTodo: {
          id: 'temp-id',
          title,
          __typename: 'Todo'
        }
      },
    })
  };

  const removeTodo = (id: string) => {
    removeOptimisticTodo({
      variables: {
        id
      },
      optimisticResponse: {
        removeOptimisticTodo: {
          id,
          title: 'Optimistic todo',
          __typename: 'Todo'
        }
      },
    })
  };

  return <TodoList todos={data?.optimisticTodos ?? []} loading={loading} onCreateTodo={createTodo} onRemoveTodo={removeTodo} />
}