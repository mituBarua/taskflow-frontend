import { Search } from "lucide-react";

import {
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/task.constants";

export default function TaskFilters({
  filters,
  onChange,
}) {
  function updateFilter(name, value) {
    onChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <section
      aria-label="Task filters"
      className="
        mb-6 flex flex-col gap-4
        xl:flex-row xl:items-center xl:justify-between
      "
    >
      <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
        {["All", ...TASK_STATUSES].map((status) => {
          const active = filters.status === status;

          return (
            <button
              key={status}
              type="button"
              aria-pressed={active}
              onClick={() => updateFilter("status", status)}
              className={`
                rounded-lg px-3 py-2
                text-xs font-medium transition
                ${
                  active
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >
              {status === "All" ? "All tasks" : status}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search
            size={16}
            aria-hidden="true"
            className="
              pointer-events-none absolute
              top-3 left-3 text-slate-400
            "
          />

          <input
            className="field !pl-9"
            aria-label="Search tasks"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
          />
        </div>

        <select
          className="field sm:!w-40"
          aria-label="Filter by priority"
          value={filters.priority}
          onChange={(event) =>
            updateFilter("priority", event.target.value)
          }
        >
          <option value="All">All priorities</option>

          {TASK_PRIORITIES.map((priority) => (
            <option key={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}