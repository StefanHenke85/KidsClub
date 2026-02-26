import { ReactNode } from "react";
import { clsx } from "clsx";

interface KidsCardProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export default function KidsCard({ children, className, color }: KidsCardProps) {
  return (
    <div
      className={clsx(
        "rounded-kids-lg p-5 transition-all duration-200",
        "border border-transparent",
        color ?? [
          "bg-white dark:bg-slate-800/90",
          "shadow-[0_4px_16px_rgba(167,139,250,0.10),0_2px_4px_rgba(0,0,0,0.05)]",
          "dark:shadow-[0_4px_16px_rgba(167,139,250,0.08)]",
          "border-purple-50 dark:border-slate-700",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
