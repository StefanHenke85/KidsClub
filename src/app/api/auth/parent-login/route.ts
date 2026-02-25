import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db/turso";
import { signParentSession } from "@/lib/auth/parentSession";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "E-Mail und Passwort nötig" }, { status: 400 });
  }

  try {
    await initDb();
    const db = getDb();

    const result = await db.execute({
      sql: "SELECT id, email, password_hash FROM parents WHERE email = ?",
      args: [email.toLowerCase()],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "E-Mail oder Passwort falsch" }, { status: 401 });
    }

    const parent = result.rows[0];
    const valid = await bcrypt.compare(password, parent.password_hash as string);
    if (!valid) {
      return NextResponse.json({ error: "E-Mail oder Passwort falsch" }, { status: 401 });
    }

    const token = await signParentSession({ parentId: parent.id as string, email: parent.email as string });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("parent_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Fehler";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("parent_session");
  return res;
}
