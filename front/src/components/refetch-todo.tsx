import { CREATE_REFECTH_TODO, GET_REFECTH_TODO, REMOVE_REFECTH_TODO } from "@/data/gql";
import { useMutation, useQuery } from "@apollo/client";
import { TodoList } from "./todo-list";

export const RefetchTodo = () => {
  const { data, loading } = useQuery(GET_REFECTH_TODO);

  const [createRefetchTodo, { loading: createLoading }] = useMutation(CREATE_REFECTH_TODO, {
    refetchQueries: [{ query: GET_REFECTH_TODO }],
  });

  const [removeRefetchTodo, { loading: removeLoading }] = useMutation(REMOVE_REFECTH_TODO, {
    refetchQueries: [{ query: GET_REFECTH_TODO }],
  });

  const createTodo = (title: string) => {
    createRefetchTodo({
      variables: {
        data: {
          title
        }
      }
    })
  };

  const removeTodo = (id: string) => {
    removeRefetchTodo({
      variables: {
        id
      }
    })
  };

  return <TodoList todos={data?.refetchTodos ?? []} loading={loading} onCreateTodo={createTodo} createLoading={createLoading} onRemoveTodo={removeTodo} removeLoading={removeLoading} />
}
