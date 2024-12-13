import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReloadTodo } from './reload-todo'
import { RefetchTodo } from './refetch-todo'
import { CacheTodo } from './cache-todo'
import { OptimisticTodo } from './optimistic-todo'

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