import { CREATE_RELOAD_TODO, GET_RELOAD_TODO, REMOVE_RELOAD_TODO } from "@/data/gql";
import { useMutation, useQuery } from "@apollo/client";
import { TodoList } from "./todo-list";

export const ReloadTodo = () => {
  const { data, loading } = useQuery(GET_RELOAD_TODO);

  const [createReloadTodo, { loading: createLoading }] = useMutation(CREATE_RELOAD_TODO, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const [removeReloadTodo, { loading: removeLoading }] = useMutation(REMOVE_RELOAD_TODO, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const createTodo = (title: string) => {
    createReloadTodo({
      variables: {
        data: {
          title
        }
      }
    })
  };

  const removeTodo = (id: string) => {
    removeReloadTodo({
      variables: {
        id
      }
    })
  };

  return <TodoList todos={data?.reloadTodos ?? []} loading={loading} onCreateTodo={createTodo} createLoading={createLoading} onRemoveTodo={removeTodo} removeLoading={removeLoading} />
}