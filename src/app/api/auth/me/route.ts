import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyChildSession } from "@/lib/auth/childSession";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("child_session")?.value;
  if (!token) return NextResponse.json({ child: null });

  const payload = await verifyChildSession(token);
  if (!payload) return NextResponse.json({ child: null });

  try {
    const db = getDb();
    const prog = await db.execute({
      sql: "SELECT xp_total, level FROM child_progress WHERE child_id = ?",
      args: [payload.childId],
    });

    return NextResponse.json({
      child: {
        id: payload.childId,
        name: payload.name,
        grade: payload.grade,
        avatarEmoji: payload.avatarEmoji,
        mascotAnimal: payload.mascotAnimal ?? "fuchs",
        mascotName: payload.mascotName ?? "Kiko",
        bundesland: payload.bundesland ?? "NRW",
        parentId: payload.parentId,
        xpTotal: (prog.rows[0]?.xp_total as number) ?? 0,
        level: (prog.rows[0]?.level as number) ?? 1,
      },
    });
  } catch {
    return NextResponse.json({ child: null });
  }
}
