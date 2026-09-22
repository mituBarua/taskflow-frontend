import {
  CheckCheck,
  Layers3,
  Timer,
} from "lucide-react";

export default function TaskStats({
  tasks,
  loading,
}) {
  const stats = [
    {
      label: "Total tasks",
      value: tasks.length,
      caption: "Everything on your radar",
      icon: Layers3,
      color: "bg-slate-100 text-slate-600",
    },
    {
      label: "In progress",
      value: tasks.filter(
        (task) => task.status === "In Progress"
      ).length,
      caption: "Moving things forward",
      icon: Timer,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: tasks.filter(
        (task) => task.status === "Completed"
      ).length,
      caption: "Good work, done",
      icon: CheckCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <section
      aria-label="Task overview"
      className="mb-9 grid gap-4 sm:grid-cols-3"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="panel p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {stat.label}
              </p>

              <span className={`rounded-xl p-2.5 ${stat.color}`}>
                <Icon size={18} aria-hidden="true" />
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {loading ? "—" : stat.value}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {stat.caption}
            </p>
          </div>
        );
      })}
    </section>
  );
}