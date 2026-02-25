"use client";

import { useEffect } from "react";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import { useScreenTimeStore } from "@/store/useScreenTimeStore";

const PING_INTERVAL_MS = 60_000; // 1 minute

export function useScreenTime() {
  const { session } = useChildSessionStore();
  const { setMinutesUsed, setDailyLimit, setLocked } = useScreenTimeStore();

  useEffect(() => {
    if (!session) return;

    // Initial fetch
    fetch("/api/progress/screen-time")
      .then((r) => r.json())
      .then((data) => {
        setMinutesUsed(data.minutesUsed);
        setDailyLimit(data.limit);
        setLocked(data.locked);
      })
      .catch(() => {});

    // Ping every minute
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/progress/screen-time", { method: "POST" });
        const data = await res.json();
        setMinutesUsed(data.minutesUsed);
        setDailyLimit(data.limit);
        setLocked(data.locked);
      } catch {}
    }, PING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [session, setMinutesUsed, setDailyLimit, setLocked]);
}
