import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ParentSettings } from "@/types";

interface ParentStore {
  settings: ParentSettings;
  isParentMode: boolean;
  setParentMode: (val: boolean) => void;
  setPinHash: (hash: string) => void;
  setChildName: (name: string) => void;
  incrementFailedAttempts: () => void;
  resetFailedAttempts: () => void;
  setLockout: (until: number) => void;
}

export const useParentStore = create<ParentStore>()(
  persist(
    (set) => ({
      settings: {
        pinHash: "",
        childName: "Mein Kind",
        dailyLimitMinutes: 60,
        failedAttempts: 0,
      },
      isParentMode: false,
      setParentMode: (val) => set({ isParentMode: val }),
      setPinHash: (hash) =>
        set((s) => ({ settings: { ...s.settings, pinHash: hash } })),
      setChildName: (name) =>
        set((s) => ({ settings: { ...s.settings, childName: name } })),
      incrementFailedAttempts: () =>
        set((s) => ({
          settings: {
            ...s.settings,
            failedAttempts: s.settings.failedAttempts + 1,
          },
        })),
      resetFailedAttempts: () =>
        set((s) => ({
          settings: { ...s.settings, failedAttempts: 0, lockoutUntil: undefined },
        })),
      setLockout: (until) =>
        set((s) => ({
          settings: { ...s.settings, lockoutUntil: until },
        })),
    }),
    { name: "kidsclub-parent" }
  )
);
