import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { gql, useMutation, useQuery } from '@apollo/client'
import { Skeleton } from './ui/skeleton'

type Todo = {
  id: string;
  title: string;
  entryAnimated?: boolean;
  exitAnimated?: boolean;
}

type TodoListProps = {
  todos: Todo[];
  loading?: boolean;
  onCreateTodo?: (title: string) => void;
  createLoading?: boolean;
  onRemoveTodo?: (id: string) => void;
  removeLoading?: boolean;
}

const TodoList = ({ todos, loading, onCreateTodo, createLoading, onRemoveTodo, removeLoading }: TodoListProps) => {
  const [newTodo, setNewTodo] = useState('')
  const [removeTodoId, setRemoveTodoId] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      onCreateTodo?.(newTodo.trim())
      setNewTodo('')
    }
  }

  const deleteTodo = (id: string) => {
    onRemoveTodo?.(id)
    setRemoveTodoId(id);
  }

  console.log(todos);

  return (
    <>
        <div className="flex space-x-2 mb-4 pt-4">
          <Input
            className='rounded border-gray-300 placeholder:text-gray-300'
            type="text"
            placeholder="Nova tarefa"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter'}
          />
          <Button disabled={loading || createLoading} className='bg-emerald-300 rounded' onClick={addTodo}>{ createLoading ? <Loader2 className="animate-spin" /> : 'Adicionar' }</Button>
        </div>
        <ul className="space-y-2">
          {loading ? (
            <>
              <li><Skeleton className='h-16' /></li>
              <li><Skeleton className='h-16' /></li>
              <li><Skeleton className='h-16' /></li>
              <li><Skeleton className='h-16' /></li>
              <li><Skeleton className='h-16' /></li>
              <li><Skeleton className='h-16' /></li>
            </>
          ) : (
            todos.length ? (
              <AnimatePresence mode='popLayout'>
                {todos.map(todo => (
                  <motion.li layout initial={todo.entryAnimated ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }} animate={{ x: 0, opacity: 1 }} exit={todo.exitAnimated ? { x: 100, opacity: 0 } : {}} key={todo.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span>{todo.title}</span>
                    {removeLoading && removeTodoId === todo.id ? (
                      <div className='px-4 py-2'>
                        <Loader2 className="animate-spin text-red-400 h-4 w-4" />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete todo: ${todo.title}`}
                        disabled={loading || removeLoading}
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="text-red-400 h-4 w-4" />
                      </Button>
                    )}
                    
                  </motion.li>
                ))}
              </AnimatePresence>
            ) : (
              <p>Nenhuma tarefa adicionada</p>
            )
          )}
        </ul>
    </>
  )
}

const ReloadTodo = () => {
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

const RefetchTodo = () => {
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

const CacheTodo = () => {
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

const OptimisticTodo = () => {
  const { data, loading } = useQuery(GET_OPTIMISTIC_TODO);

  const [createOptimisticTodo] = useMutation(CREATE_OPTIMISTIC_TODO, {
    onCompleted: () => {
      console.log('completed');
    },
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

export function TodoLists() {
  return (
    <div className="container mx-auto p-4">
      <div className='w-full flex justify-center'>
        <Tabs defaultValue="reload" className="w-[400px]">
          <TabsList className='bg-gray-50 rounded'>
            <TabsTrigger value="reload">Reload</TabsTrigger>
            <TabsTrigger value="refetch">Refetch</TabsTrigger>
            <TabsTrigger value="cache">Cache</TabsTrigger>
            <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
          </TabsList>
          <TabsContent value="reload"><ReloadTodo /></TabsContent>
          <TabsContent value="refetch"><RefetchTodo /></TabsContent>
          <TabsContent value="cache"><CacheTodo /></TabsContent>
          <TabsContent value="optimistic"><OptimisticTodo /></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const GET_RELOAD_TODO = gql`
  query GetReloadTodos {
    reloadTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

const CREATE_RELOAD_TODO = gql`
  mutation CreateReloadTodo($data: CreateTodoInput!) {
    createReloadTodo(data: $data) {
      id
      title
    }
  }
`;

const REMOVE_RELOAD_TODO = gql`
  mutation RemoveReloadTodo($id: String!) {
    removeReloadTodo(id: $id) {
      id
      title
    }
  }
`;

const GET_REFECTH_TODO = gql`
  query GetRefetchTodos {
    refetchTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

const CREATE_REFECTH_TODO = gql`
  mutation CreateRefetchTodo($data: CreateTodoInput!) {
    createRefetchTodo(data: $data) {
      id
      title
    }
  }
`;

const REMOVE_REFECTH_TODO = gql`
  mutation RemoveRefetchTodo($id: String!) {
    removeRefetchTodo(id: $id) {
      id
      title
    }
  }
`;

const GET_CACHE_TODO = gql`
  query GetCacheTodos {
    cacheTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

const CREATE_CACHE_TODO = gql`
  mutation CreateCacheTodo($data: CreateTodoInput!) {
    createCacheTodo(data: $data) {
      id
      title
    }
  }
`;

const REMOVE_CACHE_TODO = gql`
  mutation RemoveCacheTodo($id: String!) {
    removeCacheTodo(id: $id) {
      id
      title
    }
  }
`;

const GET_OPTIMISTIC_TODO = gql`
  query GetOptimisticTodos {
    optimisticTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

const CREATE_OPTIMISTIC_TODO = gql`
  mutation CreateOptimisticTodo($data: CreateTodoInput!) {
    createOptimisticTodo(data: $data) {
      id
      title
    }
  }
`;

const REMOVE_OPTIMISTIC_TODO = gql`
  mutation RemoveOptimisticTodo($id: String!) {
    removeOptimisticTodo(id: $id) {
      id
      title
    }
  }
`;