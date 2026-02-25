"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({ href, label = "Zurück" }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => href ? router.push(href) : router.back()}
      className="flex items-center gap-1 text-kids-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mb-2"
    >
      <span className="text-lg">‹</span> {label}
    </button>
  );
}
