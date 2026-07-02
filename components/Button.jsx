import clsx from "clsx";

export function Button({ children, className = "", variant = "default", ...props }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition active:scale-[0.98]",
        variant === "default" && "bg-ink text-white hover:bg-black",
        variant === "soft" && "bg-white/75 text-ink border border-line hover:bg-white",
        variant === "ghost" && "bg-transparent text-ink hover:bg-white/60",
        variant === "danger" && "bg-red-50 text-red-700 border border-red-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
