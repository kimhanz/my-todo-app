import { useState } from "react"
import { useTodos } from "../hooks/useTodos.ts"
import { type Todo } from "../types/todos.ts"
import { TodoForm } from "./TodoForm.tsx"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaRegPenToSquare } from "react-icons/fa6"

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
    <li className="bg-white p-5 shadow-sm flex items-start justify-between gap-3 rounded-2xl ">
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1 checkbox checkbox-accent"
          aria-label={`Toggle ${todo.title}`}
        />
        <div className="flex-1">
          {!editing ? (
            <>
              <div
                className={`text-lg ${
                  todo.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {todo.title}
              </div>
              <div className="text-sm text-slate-400 mt-1">ID: {todo.id}</div>
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
            <FaRegPenToSquare
              className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
              size={23}
            />
          </button>
          <button
            className="btn-ghost"
            onClick={() => document?.getElementById("my_modal_1")?.showModal()}
            aria-label="Delete"
          >
            <FaRegTrashAlt
              className="text-red-500 hover:text-red-700 hover:cursor-pointer"
              size={23}
            />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">You want to Delete todo?</p>
              <div className="modal-action">
                <form method="dialog" className="flex gap-x-1">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className=" btn bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </li>
  )
}
