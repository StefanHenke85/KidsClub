"use client";

import { create } from "zustand";
import type { GradeLevel } from "@/types";

interface ChildSession {
  childId: string;
  name: string;
  grade: GradeLevel;
  avatarEmoji: string;
  parentId: string;
  xpTotal: number;
  level: number;
}

interface ChildSessionStore {
  session: ChildSession | null;
  setSession: (s: ChildSession | null) => void;
  updateXp: (xpTotal: number, level: number) => void;
}

export const useChildSessionStore = create<ChildSessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  updateXp: (xpTotal, level) =>
    set((state) =>
      state.session ? { session: { ...state.session, xpTotal, level } } : {}
    ),
}));
