import { cn } from "../../lib/utils";

type DataCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  delta?: string;
  className?: string;
};

export function DataCard({
  title,
  value,
  subtitle,
  delta,
  className,
}: DataCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
            {title}
          </p>
          <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
          ) : null}
        </div>
        {delta ? (
          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-100">
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
