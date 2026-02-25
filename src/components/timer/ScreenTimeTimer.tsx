"use client";

import { useScreenTime } from "@/hooks/useScreenTime";
import { useScreenTimeStore } from "@/store/useScreenTimeStore";
import TimeLockScreen from "./TimeLockScreen";

export default function ScreenTimeTimer({ children }: { children: React.ReactNode }) {
  useScreenTime(); // Starts the ping loop

  const { locked, minutesUsed, dailyLimit } = useScreenTimeStore();

  if (locked) {
    return <TimeLockScreen minutesUsed={minutesUsed} limit={dailyLimit} />;
  }

  return <>{children}</>;
}
