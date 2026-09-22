import { LoaderCircle } from "lucide-react";

const variantStyles = {
  primary:
    "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800",

  secondary:
    "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",

  danger:
    "bg-rose-600 text-white hover:bg-rose-700",

  ghost:
    "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl px-4 py-2.5 text-sm font-semibold
        transition
        disabled:pointer-events-none disabled:opacity-50
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {loading && (
        <LoaderCircle
          size={16}
          className="animate-spin"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}