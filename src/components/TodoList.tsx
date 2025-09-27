import { useTodos } from "../hooks/useTodos.ts"
import { Loader } from "./Loader.tsx"
import { TodoItem } from "./TodoItem.tsx"

export const TodoList: React.FC = () => {
  const { todos, loading, error, fetchTodos } = useTodos()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Todos</h2>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-info text-white mr-4"
            onClick={fetchTodos}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 bg-white shadow-sm card flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 card border border-red-100">
          <div className="font-medium">Error</div>
          <div className="text-sm">{error}</div>
        </div>
      ) : (
        <>
          {todos.length === 0 ? (
            <div className="p-4 bg-white card shadow-sm text-slate-500">
              No todos yet. Add your first todo!
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((t) => (
                <TodoItem key={t.id} todo={t} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
