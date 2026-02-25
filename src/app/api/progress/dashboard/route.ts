import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyParentSession } from "@/lib/auth/parentSession";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("parent_session")?.value;
  if (!token) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const session = await verifyParentSession(token);
  if (!session) return NextResponse.json({ error: "Session ungültig" }, { status: 401 });

  const childId = req.nextUrl.searchParams.get("childId");
  if (!childId) return NextResponse.json({ error: "childId fehlt" }, { status: 400 });

  const db = getDb();

  // Verify ownership
  const check = await db.execute({
    sql: "SELECT id FROM children WHERE id = ? AND parent_id = ?",
    args: [childId, session.parentId],
  });
  if (check.rows.length === 0) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });

  // Child info
  const childRow = await db.execute({
    sql: "SELECT id, name, age, grade, avatar_emoji, daily_limit_minutes, login_code FROM children WHERE id = ?",
    args: [childId],
  });

  // Progress
  const progRow = await db.execute({
    sql: "SELECT xp_total, level, streak_days, last_active_date FROM child_progress WHERE child_id = ?",
    args: [childId],
  });

  // Badges
  const badgeRows = await db.execute({
    sql: "SELECT badge_id, earned_at FROM badges_earned WHERE child_id = ? ORDER BY earned_at DESC",
    args: [childId],
  });

  // Today's screen time
  const today = new Date().toISOString().split("T")[0];
  const timeRow = await db.execute({
    sql: "SELECT minutes_used FROM screen_time_sessions WHERE child_id = ? AND session_date = ?",
    args: [childId, today],
  });

  // Weekly sessions (last 7 days)
  const weekRows = await db.execute({
    sql: `SELECT date(played_at) as day, SUM(xp_earned) as xp, COUNT(*) as games
          FROM game_sessions
          WHERE child_id = ? AND played_at >= date('now', '-6 days')
          GROUP BY date(played_at)
          ORDER BY day`,
    args: [childId],
  });

  const child = childRow.rows[0];
  const prog = progRow.rows[0];

  return NextResponse.json({
    child: {
      id: child.id,
      name: child.name,
      age: child.age,
      grade: child.grade,
      avatarEmoji: child.avatar_emoji,
      dailyLimitMinutes: child.daily_limit_minutes,
      loginCode: child.login_code,
    },
    progress: {
      xpTotal: prog?.xp_total ?? 0,
      level: prog?.level ?? 1,
      streakDays: prog?.streak_days ?? 0,
      lastActiveDate: prog?.last_active_date ?? null,
    },
    badges: badgeRows.rows.map((r) => ({ badgeId: r.badge_id, earnedAt: r.earned_at })),
    todayMinutes: (timeRow.rows[0]?.minutes_used as number) ?? 0,
    weekSessions: weekRows.rows.map((r) => ({ day: r.day, xp: r.xp ?? 0, games: r.games ?? 0 })),
  });
}
