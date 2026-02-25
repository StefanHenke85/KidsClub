import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyParentSession } from "@/lib/auth/parentSession";
import { randomUUID } from "crypto";

async function getParentId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("parent_session")?.value;
  if (!token) return null;
  const payload = await verifyParentSession(token);
  return payload?.parentId ?? null;
}

// GET /api/kinder – alle Kinder des Elternteils
export async function GET(req: NextRequest) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const db = getDb();
  const result = await db.execute({
    sql: `SELECT c.id, c.name, c.age, c.grade, c.login_code, c.avatar_emoji, c.daily_limit_minutes,
                 cp.xp_total, cp.level, cp.streak_days, cp.last_active_date
          FROM children c
          LEFT JOIN child_progress cp ON cp.child_id = c.id
          WHERE c.parent_id = ?
          ORDER BY c.created_at`,
    args: [parentId],
  });

  return NextResponse.json({ children: result.rows });
}

// POST /api/kinder – neues Kind anlegen
export async function POST(req: NextRequest) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { name, age, grade, loginCode, avatarEmoji, dailyLimitMinutes } = await req.json();

  if (!name || !grade || !loginCode || loginCode.length !== 4 || !/^\d{4}$/.test(loginCode)) {
    return NextResponse.json({ error: "Name, Klasse und 4-stelliger Zahlencode nötig" }, { status: 400 });
  }

  const db = getDb();

  // Check if code already used by this parent
  const existing = await db.execute({
    sql: "SELECT id FROM children WHERE parent_id = ? AND login_code = ?",
    args: [parentId, loginCode],
  });
  if (existing.rows.length > 0) {
    return NextResponse.json({ error: "Dieser Code wird bereits von einem anderen Kind verwendet" }, { status: 409 });
  }

  const id = randomUUID();
  await db.execute({
    sql: `INSERT INTO children (id, parent_id, name, age, grade, login_code, avatar_emoji, daily_limit_minutes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, parentId, name.trim(), age ?? null, grade, loginCode, avatarEmoji ?? "🦊", dailyLimitMinutes ?? 60],
  });

  // Init progress
  await db.execute({
    sql: `INSERT INTO child_progress (id, child_id) VALUES (?, ?)`,
    args: [randomUUID(), id],
  });

  return NextResponse.json({ ok: true, id });
}
