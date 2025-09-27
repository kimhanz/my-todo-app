import axios from "axios"
import { Todo } from "../types/todos.ts"

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
})

export async function fetchTodosAPI(limit = 10): Promise<Todo[]> {
  const res = await api.get<Todo[]>(`/todos?_limit=${limit}`)
  return res.data
}

export async function createTodoAPI(
  payload: Pick<Todo, "title" | "completed">
): Promise<Todo> {
  const res = await api.post<Todo>("/todos", payload)
  return res.data
}

export async function updateTodoAPI(
  id: number,
  payload: Partial<Todo>
): Promise<Todo> {
  const res = await api.put<Todo>(`/todos/${id}`, payload)
  return res.data
}

export async function deleteTodoAPI(id: number): Promise<void> {
  await api.delete(`/todos/${id}`)
}
