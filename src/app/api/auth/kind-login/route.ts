import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { signChildSession } from "@/lib/auth/childSession";
import type { GradeLevel } from "@/types";

export async function POST(req: NextRequest) {
  const { name, code } = await req.json();

  if (!name || !code || code.length !== 4) {
    return NextResponse.json({ error: "Name und 4-stelliger Code nötig" }, { status: 400 });
  }

  try {
    const db = getDb();

    const result = await db.execute({
      sql: `SELECT c.id, c.name, c.grade, c.avatar_emoji, c.parent_id, c.daily_limit_minutes
            FROM children c
            WHERE LOWER(c.name) = LOWER(?) AND c.login_code = ?`,
      args: [name.trim(), code],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Name oder Code falsch" }, { status: 401 });
    }

    const child = result.rows[0];

    const token = await signChildSession({
      childId: child.id as string,
      name: child.name as string,
      grade: child.grade as GradeLevel,
      avatarEmoji: child.avatar_emoji as string,
      parentId: child.parent_id as string,
    });

    // Get or create progress
    await db.execute({
      sql: `INSERT OR IGNORE INTO child_progress (id, child_id) VALUES (lower(hex(randomblob(16))), ?)`,
      args: [child.id as string],
    });

    // Update last active + streak
    const today = new Date().toISOString().split("T")[0];
    const prog = await db.execute({
      sql: "SELECT xp_total, level, streak_days, last_active_date FROM child_progress WHERE child_id = ?",
      args: [child.id as string],
    });

    let streakDays = (prog.rows[0]?.streak_days as number) ?? 0;
    const lastDate = prog.rows[0]?.last_active_date as string | null;

    if (lastDate) {
      const diffDays = Math.floor((new Date(today).getTime() - new Date(lastDate).getTime()) / 86400000);
      if (diffDays === 1) streakDays += 1;
      else if (diffDays > 1) streakDays = 1;
    } else {
      streakDays = 1;
    }

    await db.execute({
      sql: "UPDATE child_progress SET last_active_date = ?, streak_days = ? WHERE child_id = ?",
      args: [today, streakDays, child.id as string],
    });

    const res = NextResponse.json({
      ok: true,
      child: {
        id: child.id,
        name: child.name,
        grade: child.grade,
        avatarEmoji: child.avatar_emoji,
        dailyLimitMinutes: child.daily_limit_minutes,
        xpTotal: prog.rows[0]?.xp_total ?? 0,
        level: prog.rows[0]?.level ?? 1,
      },
    });

    res.cookies.set("child_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 12, // 12h
      path: "/",
    });

    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Fehler";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
