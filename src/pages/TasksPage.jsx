import { useState } from "react";
import { AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";

import { useTasks } from "../hooks/useTasks";

import Button from "../components/ui/Button";
import TaskStats from "../components/tasks/TaskStats";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import DeleteTaskDialog from "../components/tasks/DeleteTaskDialog";

const INITIAL_FILTERS = {
  search: "",
  status: "All",
  priority: "All",
};

export default function TasksPage() {
  const {
    tasks,
    loading,
    error,
    reload,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // null: closed
  // {}: create mode
  // task object: edit mode
  const [editor, setEditor] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const hasFilters =
    filters.search.trim() !== "" ||
    filters.status !== "All" ||
    filters.priority !== "All";

  const filteredTasks = tasks.filter((task) => {
    const searchText =
      `${task.title} ${task.description}`.toLowerCase();

    const matchesSearch = searchText.includes(
      filters.search.trim().toLowerCase()
    );

    const matchesStatus =
      filters.status === "All" ||
      task.status === filters.status;

    const matchesPriority =
      filters.priority === "All" ||
      task.priority === filters.priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  async function handleSave(values) {
    if (editor.id) {
      await updateTask(editor.id, values);

      toast.success("Task updated successfully.");
    } else {
      await createTask(values);

      toast.success("Task created successfully.");
    }

    setEditor(null);
  }

  async function handleDelete(id) {
    await deleteTask(id);

    setDeleteTarget(null);

    toast.success("Task deleted.");
  }

  async function handleStatusChange(id, status) {
    setUpdatingId(id);

    try {
      await updateTask(id, { status });

      toast.success("Task status updated.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <>
      <div
        className="
          mb-8 flex flex-col justify-between gap-5
          sm:flex-row sm:items-center
        "
      >
        <div>
          <p
            className="
              text-[10px] font-bold
              tracking-[0.2em] text-emerald-700
            "
          >
            A LITTLE CLARITY, EVERY DAY
          </p>

          <h1
            className="
              mt-3 text-3xl font-bold
              tracking-tight sm:text-4xl
            "
          >
            Your work, in focus.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Plan the next step. Keep the whole team moving.
          </p>
        </div>

        <Button
          className="self-start sm:self-auto"
          disabled={
            loading ||
            Boolean(error) ||
            updatingId !== null
          }
          onClick={() => setEditor({})}
        >
          <Plus size={17} />
          New task
        </Button>
      </div>

      <TaskStats
        tasks={tasks}
        loading={loading}
      />

      <div className="mb-5 flex items-center gap-3">
        <h2 className="text-lg font-semibold">
          Task board
        </h2>

        <span
          className="
            rounded-lg bg-slate-100 px-2 py-1
            text-xs font-medium text-slate-500
          "
        >
          {tasks.length}
        </span>
      </div>

      <TaskFilters
        filters={filters}
        onChange={setFilters}
      />

      {error ? (
        <div
          role="alert"
          className="
            flex flex-col gap-4 rounded-2xl
            border border-rose-100 bg-rose-50 p-5
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div className="flex items-center gap-3 text-sm text-rose-700">
            <AlertCircle
              size={20}
              className="shrink-0"
            />

            {error}
          </div>

          <Button
            variant="secondary"
            onClick={reload}
          >
            Try again
          </Button>
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          hasFilters={hasFilters}
          updatingId={updatingId}
          onCreate={() => setEditor({})}
          onClearFilters={() =>
            setFilters(INITIAL_FILTERS)
          }
          onEdit={setEditor}
          onDelete={setDeleteTarget}
          onStatusChange={handleStatusChange}
        />
      )}

      {!loading && !error && (
        <p className="mt-6 text-xs text-slate-400">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
      )}

      {editor && (
        <TaskForm
          task={editor.id ? editor : null}
          onClose={() => setEditor(null)}
          onSubmit={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteTaskDialog
          task={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}