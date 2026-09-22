import {
  ArrowUpRight,
  Check,
  LayoutGrid,
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <aside
        className="
          fixed inset-y-0 left-0 hidden w-60
          flex-col border-r border-slate-200
          bg-white p-6 lg:flex
        "
      >
        <a
          href="/"
          className="flex items-center gap-3"
        >
          <span
            className="
              grid size-10 place-items-center
              rounded-xl bg-emerald-700 text-white
            "
          >
            <Check size={24} />
          </span>

          <span className="text-2xl font-bold tracking-tight">
            taskflow
            <span className="text-emerald-600">.</span>
          </span>
        </a>

        <div className="mt-12">
          <p
            className="
              text-[10px] font-bold
              tracking-[0.2em] text-slate-400
            "
          >
            WORKSPACE
          </p>

          <a
            href="/"
            aria-current="page"
            className="
              mt-4 flex items-center gap-3
              rounded-xl bg-emerald-50 px-4 py-3
              text-sm font-semibold text-emerald-800
            "
          >
            <LayoutGrid size={18} />
            Tasks
          </a>
        </div>

        <div className="mt-auto rounded-2xl bg-stone-100 p-5">
          <ArrowUpRight className="mb-4 text-emerald-700" />

          <p className="font-semibold leading-6">
            Small steps.
            <br />
            at a time
          </p>

          <p className="mt-3 text-xs leading-6 text-slate-500">
            Give your next great idea a clear next step.
          </p>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header
          className="
            flex h-20 items-center justify-between
            gap-4 border-b border-slate-200/80
            bg-white/80 px-5 sm:px-8
          "
        >
          <p className="text-sm text-slate-400">
            Workspace
            <span className="mx-3">/</span>
            <span className="font-medium text-slate-700">
              Tasks
            </span>
          </p>

          <span className="text-xs text-slate-500">
            {formatDate(new Date())}
          </span>
        </header>

        <main
          className="
            mx-auto max-w-7xl
            px-5 py-8 sm:px-8 sm:py-10
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}