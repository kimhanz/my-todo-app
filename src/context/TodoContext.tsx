import React, { createContext, useEffect, useRef, useState } from "react";
import { type Todo } from "../types/todos.ts";
import * as api from "../services/api.ts";
import toast from "react-hot-toast";

type FilterType = "all" | "active" | "completed";

type TodoContextType = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const hasFetchedRef = useRef(false); //  ป้องกัน fetch ซ้ำ

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    const t = toast.loading("Loading todos...");
    try {
      const data = await api.fetchTodosAPI();
      setTodos(data);
      toast.success("Todos loaded", { id: t });
    } catch (err: any) {
      const msg = err?.message ?? "Unknown error";
      setError(msg);
      toast.error(msg, { id: t });

      /* Use Unknown - Best Practice
      catch (err: unknown) { 
      let msg = "Unknown error"; 

      if (err instanceof Error) {
        msg = err.message;
      }

      setError(msg);
      toast.error(msg, { id: t });
    }
     */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchTodos();
    }
  }, []);

  const addTodo = async (title: string) => {
    setLoading(true);
    setError(null);
    const t = toast.loading("Creating todo...");
    try {
      const newTodoPayload = { title, completed: false };
      const created = await api.createTodoAPI(newTodoPayload);

      const newId = created.id ?? Date.now();
      const createdLocal: Todo = {
        id: newId,
        title: created.title ?? title,
        completed: !!created.completed,
      };
      // update state todos
      setTodos((prev) => [createdLocal, ...prev]);
      toast.success("Todo created", { id: t });

      /* Use Unknown - Best Practice
      catch (err: unknown) { 
      let msg = "Unknown error"; 

      if (err instanceof Error) {
        msg = err.message;
      }

      setError(msg);
      toast.error(msg, { id: t });
    }
     */
    } catch (err: any) {
      const msg = err?.message ?? "Failed to create todo";
      setError(msg);
      toast.error(msg, { id: t });
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    setLoading(true);
    setError(null);
    const t = toast.loading("Updating todo...");
    try {
      const updated = await api.updateTodoAPI(id, updates);
      // update state
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
      toast.success("Todo updated", { id: t });
    } catch (err: any) {
      const msg = err?.message ?? "Failed to update todo";
      setError(msg);
      toast.error(msg, { id: t });
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    const t = toast.loading("Deleting todo...");
    try {
      await api.deleteTodoAPI(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Todo deleted", { id: t });
    } catch (err: any) {
      const msg = err?.message ?? "Failed to delete todo";
      setError(msg);
      toast.error(msg, { id: t });
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    /* ถ้าไม่เจอ todo หยุดทำงานทันที */
    if (!target) return;

    /* สลับค่า */
    const newCompleted = !target.completed;

    /* update state */
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );

    const t = toast.loading(
      newCompleted ? "Marking as done..." : "Marking as undone..."
    );

    try {
      await api.updateTodoAPI(id, { ...target, completed: newCompleted });
      toast.success("Status updated", { id: t });
    } catch (err: any) {
      setTodos((prev) => prev.map((t) => (t.id === id ? target : t))); // rollback ถ้า error
      const msg = err?.message ?? "Failed to toggle todo";
      setError(msg);
      toast.error(msg, { id: t });
    } finally {
      setLoading(false);
    }
  };

  const context: TodoContextType = {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    filter,
    setFilter,
  };

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
};
