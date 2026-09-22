import {
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

import Button from "../ui/Button";
import { formatDate } from "../../utils/formatDate";

import {
  TASK_STATUSES,
  PRIORITY_STYLES,
  STATUS_DOT_STYLES,
} from "../../constants/task.constants";

export default function TaskCard({
  task,
  disabled,
  updating,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <article
      className="
        panel flex min-w-0 flex-col overflow-hidden
        transition hover:border-emerald-200
        hover:shadow-md
      "
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`
              rounded-lg px-2.5 py-1
              text-[11px] font-semibold
              ring-1 ring-inset
              ${PRIORITY_STYLES[task.priority]}
            `}
          >
            {task.priority} priority
          </span>

          <span className="text-xs text-slate-400">
            #{String(task.id).padStart(3, "0")}
          </span>
        </div>

        <h3
          className="
            mt-5 text-base font-semibold
            [overflow-wrap:anywhere]
          "
        >
          {task.title}
        </h3>

        <p
          className="
            mt-2 flex-1 text-sm leading-6
            whitespace-pre-wrap text-slate-500
            [overflow-wrap:anywhere]
          "
        >
          {task.description || "No description added yet."}
        </p>

        <div
          className="
            mt-6 flex items-center gap-2
            text-[11px] text-slate-400
          "
        >
          <CalendarDays size={13} aria-hidden="true" />
          Created {formatDate(task.created_at)}
        </div>

        <div className="mt-3 flex justify-end gap-1">
          <Button
            variant="ghost"
            className="!px-3 !py-2 !text-xs"
            disabled={disabled}
            aria-label={`Edit ${task.title}`}
            onClick={() => onEdit(task)}
          >
            <Pencil size={13} />
            Edit
          </Button>

          <Button
            variant="ghost"
            className="
              !px-3 !py-2 !text-xs
              hover:!text-rose-600
            "
            disabled={disabled}
            aria-label={`Delete ${task.title}`}
            onClick={() => onDelete(task)}
          >
            <Trash2 size={13} />
            Delete
          </Button>
        </div>
      </div>

      <div
        className="
          flex items-center gap-2
          border-t border-slate-100
          bg-stone-50/70 px-5 py-3
        "
      >
        <span
          aria-hidden="true"
          className={`
            size-2 shrink-0 rounded-full
            ${STATUS_DOT_STYLES[task.status]}
          `}
        />

        <select
          aria-label={`Status for ${task.title}`}
          value={task.status}
          disabled={disabled}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value)
          }
          className="
            min-w-0 flex-1 rounded-md bg-transparent
            py-1 text-xs font-medium text-slate-600
            outline-emerald-600
          "
        >
          {TASK_STATUSES.map((status) => (
            <option key={status}>
              {status}
            </option>
          ))}
        </select>

        {updating && (
          <span
            role="status"
            className="text-xs text-emerald-700"
          >
            Saving...
          </span>
        )}
      </div>
    </article>
  );
}