import { useTodos } from "../hooks/useTodos.ts";
import { Loader } from "./Loader.tsx";
import { TodoItem } from "./TodoItem.tsx";

export const TodoList: React.FC = () => {
  const { todos, loading, error, fetchTodos, filter, setFilter } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Todos</h2>
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="select select-bordered"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          {/* Refresh Button */}
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
          {filteredTodos.length === 0 ? (
            <div className="p-4 bg-white card shadow-sm text-slate-500">
              No todos yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTodos.map((t) => (
                <TodoItem key={t.id} todo={t} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
