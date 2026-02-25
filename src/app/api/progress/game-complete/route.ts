import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyChildSession } from "@/lib/auth/childSession";
import { calcXp, levelFromXp } from "@/lib/xp/calculator";
import { randomUUID } from "crypto";
import type { Difficulty, XpRewardResult } from "@/types";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("child_session")?.value;
  if (!token) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const session = await verifyChildSession(token);
  if (!session) return NextResponse.json({ error: "Session ungültig" }, { status: 401 });

  const { game, difficulty, correct, total, durationSeconds } = await req.json();

  if (!game || !difficulty || total === undefined || correct === undefined) {
    return NextResponse.json({ error: "Fehlende Parameter" }, { status: 400 });
  }

  const db = getDb();
  const childId = session.childId;
  const grade = session.grade;

  // Calculate XP
  const xpEarned = calcXp({ difficulty: difficulty as Difficulty, grade, correct, total });

  // Save game session
  await db.execute({
    sql: `INSERT INTO game_sessions (id, child_id, game, grade, difficulty, score, xp_earned, questions_total, questions_correct, duration_seconds)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [randomUUID(), childId, game, grade, difficulty, correct, xpEarned, total, correct, durationSeconds ?? 0],
  });

  // Update progress
  const prog = await db.execute({
    sql: "SELECT xp_total, level FROM child_progress WHERE child_id = ?",
    args: [childId],
  });

  const oldXp = (prog.rows[0]?.xp_total as number) ?? 0;
  const newXp = oldXp + xpEarned;
  const newLevel = levelFromXp(newXp);
  const leveledUp = newLevel > ((prog.rows[0]?.level as number) ?? 1);

  await db.execute({
    sql: "UPDATE child_progress SET xp_total = ?, level = ?, updated_at = datetime('now') WHERE child_id = ?",
    args: [newXp, newLevel, childId],
  });

  // Check for new badges
  const existingBadges = await db.execute({
    sql: "SELECT badge_id FROM badges_earned WHERE child_id = ?",
    args: [childId],
  });
  const earned = new Set(existingBadges.rows.map((r) => r.badge_id as string));

  const gameCounts = await db.execute({
    sql: `SELECT game, COUNT(*) as cnt FROM game_sessions WHERE child_id = ? GROUP BY game`,
    args: [childId],
  });
  const counts: Record<string, number> = {};
  for (const row of gameCounts.rows) {
    counts[row.game as string] = row.cnt as number;
  }

  const streakRow = await db.execute({
    sql: "SELECT streak_days FROM child_progress WHERE child_id = ?",
    args: [childId],
  });
  const streak = (streakRow.rows[0]?.streak_days as number) ?? 0;

  const newBadges: { badgeId: string; earnedAt: string }[] = [];

  const checks: [string, boolean][] = [
    ["erstes_spiel", (counts["mathe"] ?? 0) + (counts["deutsch"] ?? 0) + (counts["logik"] ?? 0) >= 1],
    ["mathe_koenig", (counts["mathe"] ?? 0) >= 10],
    ["deutschmeister", (counts["deutsch"] ?? 0) >= 10],
    ["logik_fuchs", (counts["logik"] ?? 0) >= 10],
    ["streak_3", streak >= 3],
    ["streak_5", streak >= 5],
    ["streak_7", streak >= 7],
    ["xp_100", newXp >= 100],
    ["xp_500", newXp >= 500],
    ["xp_1000", newXp >= 1000],
    ["level_5", newLevel >= 5],
    ["level_10", newLevel >= 10],
    ["perfect_game", correct === total && total > 0],
    ["alle_spiele", counts["mathe"] > 0 && counts["deutsch"] > 0 && counts["logik"] > 0],
  ];

  const now = new Date().toISOString();
  for (const [badgeId, condition] of checks) {
    if (condition && !earned.has(badgeId)) {
      await db.execute({
        sql: "INSERT OR IGNORE INTO badges_earned (id, child_id, badge_id) VALUES (?, ?, ?)",
        args: [randomUUID(), childId, badgeId],
      });
      newBadges.push({ badgeId, earnedAt: now });
    }
  }

  const result: XpRewardResult = {
    xpEarned,
    newTotal: newXp,
    newLevel,
    leveledUp,
    newBadges: newBadges.map((b) => ({ badgeId: b.badgeId, earnedAt: b.earnedAt })),
  };

  return NextResponse.json(result);
}
