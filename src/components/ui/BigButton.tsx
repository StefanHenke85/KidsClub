"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";

interface BigButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: "yellow" | "blue" | "green" | "purple" | "orange" | "pink" | "gray";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const COLOR_MAP = {
  yellow: [
    "bg-kidsYellow text-gray-800",
    "shadow-[0_6px_0_#c9a400]",
    "hover:shadow-[0_8px_0_#c9a400] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#c9a400] active:translate-y-1",
    "border-2 border-yellow-300",
  ],
  blue: [
    "bg-kidsBlue text-gray-800",
    "shadow-[0_6px_0_#3a9fc9]",
    "hover:shadow-[0_8px_0_#3a9fc9] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#3a9fc9] active:translate-y-1",
    "border-2 border-sky-300",
  ],
  green: [
    "bg-kidsGreen text-gray-800",
    "shadow-[0_6px_0_#2daa7a]",
    "hover:shadow-[0_8px_0_#2daa7a] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#2daa7a] active:translate-y-1",
    "border-2 border-emerald-300",
  ],
  purple: [
    "bg-kidsPurple text-white",
    "shadow-[0_6px_0_#6d28d9]",
    "hover:shadow-[0_8px_0_#6d28d9] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#6d28d9] active:translate-y-1",
    "border-2 border-purple-300",
  ],
  orange: [
    "bg-kidsOrange text-white",
    "shadow-[0_6px_0_#c95e00]",
    "hover:shadow-[0_8px_0_#c95e00] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#c95e00] active:translate-y-1",
    "border-2 border-orange-300",
  ],
  pink: [
    "bg-kidsPink text-white",
    "shadow-[0_6px_0_#c41882]",
    "hover:shadow-[0_8px_0_#c41882] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#c41882] active:translate-y-1",
    "border-2 border-pink-300",
  ],
  gray: [
    "bg-gray-200 text-gray-700",
    "shadow-[0_6px_0_#9ca3af]",
    "hover:shadow-[0_8px_0_#9ca3af] hover:-translate-y-0.5",
    "active:shadow-[0_2px_0_#9ca3af] active:translate-y-1",
    "border-2 border-gray-300",
  ],
};

const SIZE_MAP = {
  sm: "px-6 py-3 text-kids-sm rounded-kids",
  md: "px-8 py-4 text-kids-md rounded-kids",
  lg: "px-10 py-5 text-kids-lg rounded-kids-lg",
};

export default function BigButton({
  children,
  onClick,
  color = "orange",
  size = "md",
  disabled = false,
  className,
  type = "button",
}: BigButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "font-black transition-all duration-100 select-none",
        "hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-kidsPurple/40",
        COLOR_MAP[color],
        SIZE_MAP[size],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {children}
    </button>
  );
}
