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
  yellow: "bg-kidsYellow hover:brightness-95 active:translate-y-1 text-gray-800 shadow-[0_5px_0_#c9a800]",
  blue:   "bg-kidsBlue   hover:brightness-95 active:translate-y-1 text-gray-800 shadow-[0_5px_0_#3a9fc9]",
  green:  "bg-kidsGreen  hover:brightness-95 active:translate-y-1 text-gray-800 shadow-[0_5px_0_#2daa7a]",
  purple: "bg-kidsPurple hover:brightness-95 active:translate-y-1 text-white     shadow-[0_5px_0_#8b36d4]",
  orange: "bg-kidsOrange hover:brightness-95 active:translate-y-1 text-white     shadow-[0_5px_0_#c95e00]",
  pink:   "bg-kidsPink   hover:brightness-95 active:translate-y-1 text-white     shadow-[0_5px_0_#c41882]",
  gray:   "bg-gray-200   hover:brightness-95 active:translate-y-1 text-gray-700  shadow-[0_5px_0_#aaa]",
};

const SIZE_MAP = {
  sm: "px-5 py-3 text-kids-sm rounded-kids",
  md: "px-7 py-4 text-kids-md rounded-kids",
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
        "font-extrabold transition-all duration-100 select-none",
        COLOR_MAP[color],
        SIZE_MAP[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
