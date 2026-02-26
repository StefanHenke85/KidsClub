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

// PATCH /api/freunde/[requestId] – Anfrage genehmigen oder ablehnen
export async function PATCH(
  req: NextRequest,
  { params }: { params: { requestId: string } }
) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { action } = await req.json();
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "action muss 'approve' oder 'reject' sein" }, { status: 400 });
  }

  const db = getDb();

  // Anfrage laden
  const reqResult = await db.execute({
    sql: "SELECT id, from_child_id, to_child_id, status FROM friend_requests WHERE id = ?",
    args: [params.requestId],
  });
  if (reqResult.rows.length === 0) {
    return NextResponse.json({ error: "Anfrage nicht gefunden" }, { status: 404 });
  }

  const fr = reqResult.rows[0];
  if (fr.status !== "pending") {
    return NextResponse.json({ error: "Anfrage bereits bearbeitet" }, { status: 409 });
  }

  // Prüfen dass to_child_id einem eigenen Kind gehört
  const myChild = await db.execute({
    sql: "SELECT id FROM children WHERE id = ? AND parent_id = ?",
    args: [fr.to_child_id, parentId],
  });
  if (myChild.rows.length === 0) {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  if (action === "reject") {
    await db.execute({
      sql: "UPDATE friend_requests SET status = 'rejected' WHERE id = ?",
      args: [params.requestId],
    });
    return NextResponse.json({ ok: true, action: "rejected" });
  }

  // approve: Freundschaft in beide Richtungen + Status updaten
  await db.execute({
    sql: "UPDATE friend_requests SET status = 'approved' WHERE id = ?",
    args: [params.requestId],
  });

  await db.execute({
    sql: "INSERT OR IGNORE INTO friendships (id, child_a_id, child_b_id) VALUES (?, ?, ?)",
    args: [randomUUID(), fr.from_child_id as string, fr.to_child_id as string],
  });

  await db.execute({
    sql: "INSERT OR IGNORE INTO friendships (id, child_a_id, child_b_id) VALUES (?, ?, ?)",
    args: [randomUUID(), fr.to_child_id as string, fr.from_child_id as string],
  });

  return NextResponse.json({ ok: true, action: "approved" });
}
