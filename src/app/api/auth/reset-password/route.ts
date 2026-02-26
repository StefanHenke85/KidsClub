import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/turso";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password || password.length < 6) {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const db = getDb();
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const result = await db.execute({
    sql: `SELECT id, parent_id, expires_at, used
          FROM password_reset_tokens
          WHERE token_hash = ? AND used = 0`,
    args: [tokenHash],
  });

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Link ungültig oder bereits verwendet" }, { status: 400 });
  }

  const row = result.rows[0];
  const expiresAt = new Date(String(row.expires_at));
  if (expiresAt < new Date()) {
    return NextResponse.json({ error: "Link abgelaufen – bitte neue Anfrage stellen" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.execute({
    sql: "UPDATE parents SET password_hash = ? WHERE id = ?",
    args: [passwordHash, String(row.parent_id)],
  });

  await db.execute({
    sql: "UPDATE password_reset_tokens SET used = 1 WHERE id = ?",
    args: [String(row.id)],
  });

  return NextResponse.json({ ok: true });
}
