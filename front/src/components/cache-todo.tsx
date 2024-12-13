import { useMutation, useQuery } from "@apollo/client";
import { Todo, TodoList } from "./todo-list";
import { CREATE_CACHE_TODO, GET_CACHE_TODO, REMOVE_CACHE_TODO } from "@/data/gql";

export const CacheTodo = () => {
  const { data, loading } = useQuery(GET_CACHE_TODO);

  const [createCacheTodo, { loading: createLoading }] = useMutation(CREATE_CACHE_TODO, {
    update: (cache, { data }) => {
      cache.updateQuery({
        query: GET_CACHE_TODO,
      }, todos => {
        if (!todos) return;
        return {
          cacheTodos: [data.createCacheTodo, ...todos.cacheTodos]
        }
      })
    }
  });

  const [removeCacheTodo, { loading: removeLoading }] = useMutation(REMOVE_CACHE_TODO, {
    update: (cache, { data }) => {
      cache.updateQuery({
        query: GET_CACHE_TODO,
      }, todos => {
        if (!todos) return;
        return {
          cacheTodos: todos.cacheTodos.filter((todo: Todo) => todo.id !== data.removeCacheTodo.id)
        }
      })
    }
  });

  const createTodo = (title: string) => {
    createCacheTodo({
      variables: {
        data: {
          title
        }
      }
    })
  };

  const removeTodo = (id: string) => {
    removeCacheTodo({
      variables: {
        id
      }
    })
  };

  return <TodoList todos={data?.cacheTodos ?? []} loading={loading} onCreateTodo={createTodo} createLoading={createLoading} onRemoveTodo={removeTodo} removeLoading={removeLoading} />
}