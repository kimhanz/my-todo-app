import React from "react"
import { TodoList } from "./components/TodoList.tsx"
import { TodoProvider } from "./context/TodoContext.tsx"

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Todo List System</h1>

        <div className="h-6" />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default App
