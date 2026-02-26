"use client";

import { useEffect } from "react";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import type { GradeLevel } from "@/types";

export default function SessionHydrator() {
  const { session, setSession } = useChildSessionStore();

  useEffect(() => {
    if (session) return; // already hydrated
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.child) {
          setSession({
            childId: data.child.id,
            name: data.child.name,
            grade: data.child.grade as GradeLevel,
            avatarEmoji: data.child.avatarEmoji,
            parentId: data.child.parentId,
            xpTotal: data.child.xpTotal,
            level: data.child.level,
            mascotAnimal: data.child.mascotAnimal ?? "fuchs",
            mascotName: data.child.mascotName ?? "Kiko",
            bundesland: data.child.bundesland ?? "NRW",
          });
        }
      })
      .catch(() => {/* no session */});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
