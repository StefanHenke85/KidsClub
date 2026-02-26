import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db/turso";
import { verifyParentSession } from "@/lib/auth/parentSession";
import bcrypt from "bcryptjs";

async function getParentId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("parent_session")?.value;
  if (!token) return null;
  const payload = await verifyParentSession(token);
  return payload?.parentId ?? null;
}

export async function POST(req: NextRequest) {
  const { action, pin } = await req.json();

  if (action === "verify") {
    const parentId = await getParentId(req);
    if (!parentId) return NextResponse.json({ valid: false, needsLogin: true });

    await initDb();
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT pin_hash FROM parents WHERE id = ?",
      args: [parentId],
    });

    const pinHash = result.rows[0]?.pin_hash as string | null;

    // No PIN set yet → accept any input but ask to set one
    if (!pinHash) {
      return NextResponse.json({ valid: false, noPin: true });
    }

    const valid = await bcrypt.compare(pin, pinHash);
    return NextResponse.json({ valid });
  }

  if (action === "set") {
    const parentId = await getParentId(req);
    if (!parentId) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return NextResponse.json({ error: "PIN muss 4 Ziffern haben" }, { status: 400 });
    }

    await initDb();
    const db = getDb();
    const hash = await bcrypt.hash(pin, 10);
    await db.execute({
      sql: "UPDATE parents SET pin_hash = ? WHERE id = ?",
      args: [hash, parentId],
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unbekannte Aktion" }, { status: 400 });
}
