import { useState } from "react"
import { useTodos } from "../hooks/useTodos.ts"
import { type Todo } from "../types/todos.ts"
import { TodoForm } from "./TodoForm.tsx"
type Props = {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo, updateTodo } = useTodos()
  const [editing, setEditing] = useState(false)

  const handleEdit = async (title: string) => {
    await updateTodo(todo.id, { title })
    setEditing(false)
  }

  return (
    <li className="bg-white p-3 rounded shadow-sm flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1"
          aria-label={`Toggle ${todo.title}`}
        />
        <div className="flex-1">
          {!editing ? (
            <>
              <div
                className={`text-sm ${
                  todo.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {todo.title}
              </div>
              <div className="text-xs text-slate-400 mt-1">ID: {todo.id}</div>
            </>
          ) : (
            <TodoForm
              onSubmit={handleEdit}
              initial={todo.title}
              submitLabel="Save"
              onCancel={() => setEditing(false)}
            />
          )}
        </div>
      </div>

      {!editing && (
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost"
            onClick={() => setEditing(true)}
            aria-label="Edit"
          >
            Edit
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              if (confirm("Delete this todo?")) deleteTodo(todo.id)
            }}
            aria-label="Delete"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  )
}
