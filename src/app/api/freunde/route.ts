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

// GET /api/freunde – Freunde + Anfragen aller eigenen Kinder
export async function GET(req: NextRequest) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const db = getDb();

  // Eigene Kinder holen
  const myKinder = await db.execute({
    sql: "SELECT id, name, avatar_emoji, friend_code FROM children WHERE parent_id = ?",
    args: [parentId],
  });
  const myChildIds = myKinder.rows.map((r) => r.id as string);

  if (myChildIds.length === 0) {
    return NextResponse.json({ children: [], pendingRequests: [], sentRequests: [], friendships: [] });
  }

  const placeholders = myChildIds.map(() => "?").join(",");

  // Eingehende Anfragen (to_child_id = eigenes Kind)
  const incoming = await db.execute({
    sql: `SELECT fr.id, fr.status, fr.created_at,
                 fc.id as from_id, fc.name as from_name, fc.avatar_emoji as from_avatar, fc.friend_code as from_code,
                 tc.id as to_id, tc.name as to_name, tc.avatar_emoji as to_avatar
          FROM friend_requests fr
          JOIN children fc ON fc.id = fr.from_child_id
          JOIN children tc ON tc.id = fr.to_child_id
          WHERE fr.to_child_id IN (${placeholders}) AND fr.status = 'pending'
          ORDER BY fr.created_at DESC`,
    args: myChildIds,
  });

  // Gesendete Anfragen (from_child_id = eigenes Kind)
  const sent = await db.execute({
    sql: `SELECT fr.id, fr.status, fr.created_at,
                 fc.id as from_id, fc.name as from_name, fc.avatar_emoji as from_avatar, fc.friend_code as from_code,
                 tc.id as to_id, tc.name as to_name, tc.avatar_emoji as to_avatar
          FROM friend_requests fr
          JOIN children fc ON fc.id = fr.from_child_id
          JOIN children tc ON tc.id = fr.to_child_id
          WHERE fr.from_child_id IN (${placeholders}) AND fr.status = 'pending'
          ORDER BY fr.created_at DESC`,
    args: myChildIds,
  });

  // Bestätigte Freundschaften
  const friends = await db.execute({
    sql: `SELECT fs.child_a_id as my_child_id, c.id as friend_id, c.name as friend_name, c.avatar_emoji as friend_avatar
          FROM friendships fs
          JOIN children c ON c.id = fs.child_b_id
          WHERE fs.child_a_id IN (${placeholders})`,
    args: myChildIds,
  });

  return NextResponse.json({
    children: myKinder.rows,
    pendingRequests: incoming.rows,
    sentRequests: sent.rows,
    friendships: friends.rows,
  });
}

// POST /api/freunde – Freundschaftsanfrage per Code senden
export async function POST(req: NextRequest) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { friendCode, myChildId } = await req.json();
  if (!friendCode || !myChildId) {
    return NextResponse.json({ error: "friendCode und myChildId erforderlich" }, { status: 400 });
  }

  const db = getDb();

  // Prüfen dass myChildId wirklich dem Elternteil gehört
  const myChild = await db.execute({
    sql: "SELECT id FROM children WHERE id = ? AND parent_id = ?",
    args: [myChildId, parentId],
  });
  if (myChild.rows.length === 0) {
    return NextResponse.json({ error: "Kind nicht gefunden" }, { status: 403 });
  }

  // Ziel-Kind per Code suchen
  const targetChild = await db.execute({
    sql: "SELECT id, name FROM children WHERE friend_code = ?",
    args: [friendCode.toUpperCase()],
  });
  if (targetChild.rows.length === 0) {
    return NextResponse.json({ error: "Kein Kind mit diesem Code gefunden" }, { status: 404 });
  }

  const toChildId = targetChild.rows[0].id as string;

  if (toChildId === myChildId) {
    return NextResponse.json({ error: "Eigener Code – bitte anderen Code eingeben" }, { status: 400 });
  }

  // Bereits befreundet?
  const alreadyFriends = await db.execute({
    sql: "SELECT id FROM friendships WHERE child_a_id = ? AND child_b_id = ?",
    args: [myChildId, toChildId],
  });
  if (alreadyFriends.rows.length > 0) {
    return NextResponse.json({ error: "Bereits befreundet" }, { status: 409 });
  }

  // Bereits Anfrage vorhanden?
  const existing = await db.execute({
    sql: "SELECT id FROM friend_requests WHERE from_child_id = ? AND to_child_id = ? AND status = 'pending'",
    args: [myChildId, toChildId],
  });
  if (existing.rows.length > 0) {
    return NextResponse.json({ error: "Anfrage bereits gesendet" }, { status: 409 });
  }

  await db.execute({
    sql: "INSERT INTO friend_requests (id, from_child_id, to_child_id) VALUES (?, ?, ?)",
    args: [randomUUID(), myChildId, toChildId],
  });

  return NextResponse.json({ ok: true, toChildName: targetChild.rows[0].name });
}
