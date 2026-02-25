import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db/turso";
import { signParentSession } from "@/lib/auth/parentSession";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password || password.length < 6) {
    return NextResponse.json({ error: "E-Mail und Passwort (mind. 6 Zeichen) nötig" }, { status: 400 });
  }

  try {
    await initDb();
    const db = getDb();

    // Check if email already exists
    const existing = await db.execute({
      sql: "SELECT id FROM parents WHERE email = ?",
      args: [email.toLowerCase()],
    });
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "E-Mail bereits registriert" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const parentId = randomUUID();

    await db.execute({
      sql: "INSERT INTO parents (id, email, password_hash) VALUES (?, ?, ?)",
      args: [parentId, email.toLowerCase(), passwordHash],
    });

    const token = await signParentSession({ parentId, email: email.toLowerCase() });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("parent_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Fehler";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
