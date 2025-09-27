import React, { useState } from "react"
import { TodoList } from "./components/TodoList.tsx"
import { TodoProvider } from "./context/TodoContext.tsx"
import { TodoForm } from "./components/TodoForm.tsx"
import { useTodos } from "./hooks/useTodos.ts"
import { Toaster } from "react-hot-toast"

const AddArea: React.FC = () => {
  const { addTodo } = useTodos()
  const [show, setShow] = useState(true)

  return (
    <div className="bg-white p-4 shadow-sm card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Create Todo</h3>
        <button
          className="btn btn-accent text-white w-[80px]"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {show && <TodoForm onSubmit={async (title) => await addTodo(title)} />}
    </div>
  )
}

const AppContent: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-primary text-center py-2.5">
        Todo List App
      </h1>

      <AddArea />
      <div className="h-6" />
      <TodoList />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <AppContent />
      <Toaster />
    </TodoProvider>
  )
}

export default App
