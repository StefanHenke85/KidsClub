import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyChildSession } from "@/lib/auth/childSession";
import { filterMessage } from "@/lib/wordFilter";
import { randomUUID } from "crypto";

async function getChildId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("child_session")?.value;
  if (!token) return null;
  const payload = await verifyChildSession(token);
  return payload?.childId ?? null;
}

async function areFriends(db: ReturnType<typeof getDb>, childA: string, childB: string): Promise<boolean> {
  const result = await db.execute({
    sql: "SELECT id FROM friendships WHERE child_a_id = ? AND child_b_id = ?",
    args: [childA, childB],
  });
  return result.rows.length > 0;
}

// GET /api/nachrichten?with=<childId>
export async function GET(req: NextRequest) {
  const childId = await getChildId(req);
  if (!childId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const withId = req.nextUrl.searchParams.get("with");
  if (!withId) return NextResponse.json({ error: "?with= fehlt" }, { status: 400 });

  const db = getDb();

  if (!(await areFriends(db, childId, withId))) {
    return NextResponse.json({ error: "Keine Freundschaft" }, { status: 403 });
  }

  const result = await db.execute({
    sql: `SELECT id, from_child_id, text, created_at
          FROM messages
          WHERE (from_child_id = ? AND to_child_id = ?)
             OR (from_child_id = ? AND to_child_id = ?)
          ORDER BY created_at ASC
          LIMIT 200`,
    args: [childId, withId, withId, childId],
  });

  const messages = result.rows.map((r) => ({
    id: r.id,
    fromChildId: r.from_child_id,
    text: r.text,
    createdAt: r.created_at,
    fromMe: r.from_child_id === childId,
  }));

  return NextResponse.json({ messages });
}

// POST /api/nachrichten
export async function POST(req: NextRequest) {
  const childId = await getChildId(req);
  if (!childId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { toChildId, text } = await req.json();
  if (!toChildId || !text?.trim()) {
    return NextResponse.json({ error: "toChildId und text erforderlich" }, { status: 400 });
  }

  if (text.trim().length > 500) {
    return NextResponse.json({ error: "Nachricht zu lang (max. 500 Zeichen)" }, { status: 400 });
  }

  const db = getDb();

  if (!(await areFriends(db, childId, toChildId))) {
    return NextResponse.json({ error: "Keine Freundschaft" }, { status: 403 });
  }

  const { safe, filtered } = filterMessage(text.trim());

  if (!safe) {
    // Nachricht wird nicht gespeichert, aber wir geben die gefilterte Version zurück
    return NextResponse.json({ ok: false, blocked: true, filtered });
  }

  await db.execute({
    sql: "INSERT INTO messages (id, from_child_id, to_child_id, text) VALUES (?, ?, ?, ?)",
    args: [randomUUID(), childId, toChildId, filtered],
  });

  return NextResponse.json({ ok: true, text: filtered });
}
