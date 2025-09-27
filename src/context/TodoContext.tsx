import React, { createContext, useEffect, useState } from "react"
import { type Todo } from "../types/todos.ts"
import * as api from "../services/api.ts"
import toast from "react-hot-toast"

type TodoContextType = {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<void>
  updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
  toggleTodo: (id: number) => Promise<void>
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.fetchTodosAPI()
      setTodos(data)
    } catch (err: any) {
      setError(err?.message ?? "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (title: string) => {
    setLoading(true)
    setError(null)
    try {
      const newTodoPayload = { title, completed: false }
      const created = await api.createTodoAPI(newTodoPayload)

      const newId = created.id ?? Date.now()
      const createdLocal: Todo = {
        id: newId,
        title: created.title ?? title,
        completed: !!created.completed,
      }
      setTodos((prev) => [createdLocal, ...prev])
      toast.success("Create Successfully!")
    } catch (err: any) {
      setError(err?.message ?? "Failed to create todo")
    } finally {
      setLoading(false)
    }
  }

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await api.updateTodoAPI(id, updates)
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      )
      toast.success("Updated Successfully!")
    } catch (err: any) {
      setError(err?.message ?? "Failed to update todo")
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await api.deleteTodoAPI(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
      toast.success("Deleted Successfully!")
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete todo")
    } finally {
      setLoading(false)
    }
  }

  const toggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id)
    if (!target) return
    const newCompleted = !target.completed

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    )
    try {
      await api.updateTodoAPI(id, { ...target, completed: newCompleted })
    } catch (err: any) {
      setTodos((prev) => prev.map((t) => (t.id === id ? target : t)))
      setError(err?.message ?? "Failed to toggle todo")
    }
  }

  const context: TodoContextType = {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  }

  return <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
}
