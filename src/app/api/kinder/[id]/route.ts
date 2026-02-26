import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { verifyParentSession } from "@/lib/auth/parentSession";

async function getParentId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("parent_session")?.value;
  if (!token) return null;
  const payload = await verifyParentSession(token);
  return payload?.parentId ?? null;
}

// PATCH /api/kinder/[id] – Kind bearbeiten
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { name, age, grade, avatarEmoji, mascotAnimal, mascotName, dailyLimitMinutes, bundesland } = await req.json();
  const db = getDb();

  // Verify ownership
  const check = await db.execute({
    sql: "SELECT id FROM children WHERE id = ? AND parent_id = ?",
    args: [params.id, parentId],
  });
  if (check.rows.length === 0) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });

  await db.execute({
    sql: `UPDATE children SET
            name = COALESCE(?, name),
            age = COALESCE(?, age),
            grade = COALESCE(?, grade),
            avatar_emoji = COALESCE(?, avatar_emoji),
            mascot_animal = COALESCE(?, mascot_animal),
            mascot_name = COALESCE(?, mascot_name),
            daily_limit_minutes = COALESCE(?, daily_limit_minutes),
            bundesland = COALESCE(?, bundesland)
          WHERE id = ?`,
    args: [name ?? null, age ?? null, grade ?? null, avatarEmoji ?? null, mascotAnimal ?? null, mascotName ?? null, dailyLimitMinutes ?? null, bundesland ?? null, params.id],
  });

  return NextResponse.json({ ok: true });
}

// DELETE /api/kinder/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const parentId = await getParentId(req);
  if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const db = getDb();
  await db.execute({
    sql: "DELETE FROM children WHERE id = ? AND parent_id = ?",
    args: [params.id, parentId],
  });

  return NextResponse.json({ ok: true });
}
