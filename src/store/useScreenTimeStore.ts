"use client";

import { create } from "zustand";

interface ScreenTimeStore {
  minutesUsed: number;
  dailyLimit: number;
  locked: boolean;
  setMinutesUsed: (m: number) => void;
  setDailyLimit: (m: number) => void;
  setLocked: (l: boolean) => void;
  increment: () => void;
}

export const useScreenTimeStore = create<ScreenTimeStore>((set, get) => ({
  minutesUsed: 0,
  dailyLimit: 60,
  locked: false,
  setMinutesUsed: (m) => set({ minutesUsed: m }),
  setDailyLimit: (m) => set({ dailyLimit: m }),
  setLocked: (l) => set({ locked: l }),
  increment: () => {
    const { minutesUsed, dailyLimit } = get();
    const next = minutesUsed + 1;
    set({ minutesUsed: next, locked: next >= dailyLimit });
  },
}));
