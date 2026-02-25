import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyChildSession } from "@/lib/auth/childSession";
import { randomUUID } from "crypto";

// POST – ping (adds 1 minute every call)
export async function POST(req: NextRequest) {
  const token = req.cookies.get("child_session")?.value;
  if (!token) return NextResponse.json({ minutesUsed: 0, limit: 60, locked: false });

  const session = await verifyChildSession(token);
  if (!session) return NextResponse.json({ minutesUsed: 0, limit: 60, locked: false });

  const db = getDb();
  const childId = session.childId;
  const today = new Date().toISOString().split("T")[0];

  // Get limit
  const childRow = await db.execute({
    sql: "SELECT daily_limit_minutes FROM children WHERE id = ?",
    args: [childId],
  });
  const limit = (childRow.rows[0]?.daily_limit_minutes as number) ?? 60;

  // Upsert screen time
  await db.execute({
    sql: `INSERT INTO screen_time_sessions (id, child_id, session_date, minutes_used, last_ping_at)
          VALUES (?, ?, ?, 1, datetime('now'))
          ON CONFLICT(child_id, session_date)
          DO UPDATE SET
            minutes_used = minutes_used + 1,
            last_ping_at = datetime('now')`,
    args: [randomUUID(), childId, today],
  });

  const row = await db.execute({
    sql: "SELECT minutes_used FROM screen_time_sessions WHERE child_id = ? AND session_date = ?",
    args: [childId, today],
  });

  const minutesUsed = (row.rows[0]?.minutes_used as number) ?? 0;

  return NextResponse.json({ minutesUsed, limit, locked: minutesUsed >= limit });
}

// GET – current status
export async function GET(req: NextRequest) {
  const token = req.cookies.get("child_session")?.value;
  if (!token) return NextResponse.json({ minutesUsed: 0, limit: 60, locked: false });

  const session = await verifyChildSession(token);
  if (!session) return NextResponse.json({ minutesUsed: 0, limit: 60, locked: false });

  const db = getDb();
  const childId = session.childId;
  const today = new Date().toISOString().split("T")[0];

  const childRow = await db.execute({
    sql: "SELECT daily_limit_minutes FROM children WHERE id = ?",
    args: [childId],
  });
  const limit = (childRow.rows[0]?.daily_limit_minutes as number) ?? 60;

  const row = await db.execute({
    sql: "SELECT minutes_used FROM screen_time_sessions WHERE child_id = ? AND session_date = ?",
    args: [childId, today],
  });

  const minutesUsed = (row.rows[0]?.minutes_used as number) ?? 0;

  return NextResponse.json({ minutesUsed, limit, locked: minutesUsed >= limit });
}
