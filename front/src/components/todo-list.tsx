import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Trash2 } from "lucide-react";

export type Todo = {
  id: string;
  title: string;
  entryAnimated?: boolean;
  exitAnimated?: boolean;
}

export type TodoListProps = {
  todos: Todo[];
  loading?: boolean;
  onCreateTodo?: (title: string) => void;
  createLoading?: boolean;
  onRemoveTodo?: (id: string) => void;
  removeLoading?: boolean;
}

export const TodoList = ({ todos, loading, onCreateTodo, createLoading, onRemoveTodo, removeLoading }: TodoListProps) => {
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