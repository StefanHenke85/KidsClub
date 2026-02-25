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
        "rounded-kids-lg p-5 shadow-kids transition-colors duration-300",
        color ?? "bg-white dark:bg-slate-800",
        className
      )}
    >
      {children}
    </div>
  );
}
