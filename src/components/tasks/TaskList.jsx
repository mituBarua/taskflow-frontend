import { ClipboardList } from "lucide-react";

import Button from "../ui/Button";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  loading,
  hasFilters,
  updatingId,
  onCreate,
  onClearFilters,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div role="status" aria-label="Loading tasks">
        <span className="sr-only">
          Loading tasks...
        </span>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              aria-hidden="true"
              className="panel h-72 animate-pulse p-6"
            >
              <div className="h-6 w-24 rounded-lg bg-slate-100" />
              <div className="mt-7 h-5 w-4/5 rounded bg-slate-100" />
              <div className="mt-4 h-4 rounded bg-slate-100" />
              <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="panel border-dashed px-6 py-16 text-center">
        <div
          className="
            mx-auto mb-5 grid size-14 place-items-center
            rounded-2xl bg-emerald-50 text-emerald-700
          "
        >
          <ClipboardList size={26} />
        </div>

        <h3 className="text-lg font-semibold">
          {hasFilters
            ? "No matching tasks"
            : "Make room for your next idea"}
        </h3>

        <p
          className="
            mx-auto mt-2 mb-6 max-w-sm
            text-sm leading-6 text-slate-500
          "
        >
          {hasFilters
            ? "Try a different search or clear your filters."
            : "Create your first task and take the first step forward."}
        </p>

        <Button
          onClick={
            hasFilters ? onClearFilters : onCreate
          }
        >
          {hasFilters
            ? "Clear filters"
            : "Create your first task"}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          disabled={updatingId !== null}
          updating={updatingId === task.id}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}