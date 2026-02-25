import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  emoji?: string;
  color?: string;
}

export default function PageWrapper({ children, title, emoji, color = "bg-kidsBg dark:bg-slate-900" }: PageWrapperProps) {
  return (
    <main className={`min-h-screen ${color} pb-24 font-kids transition-colors duration-300`}>
      {(title || emoji) && (
        <header className="px-4 pt-6 pb-2">
          <h1 className="text-kids-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-3">
            {emoji && <span>{emoji}</span>}
            {title}
          </h1>
        </header>
      )}
      <div className="px-4 py-2">{children}</div>
    </main>
  );
}
