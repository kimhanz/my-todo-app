import axios from "axios"
import { type Todo } from "../types/todos.ts"

const api = axios.create({
  baseURL: "https://68d787692144ea3f6da5960a.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
})

export async function fetchTodosAPI(): Promise<Todo[]> {
  const res = await api.get<Todo[]>(`/todos`)
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
