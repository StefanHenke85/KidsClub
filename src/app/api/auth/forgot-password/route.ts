import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db/turso";
import { Resend } from "resend";
import { randomUUID, createHash } from "crypto";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "E-Mail fehlt" }, { status: 400 });

  await initDb();
  const db = getDb();

  // Immer OK zurückgeben (kein Hinweis ob E-Mail existiert)
  const result = await db.execute({
    sql: "SELECT id FROM parents WHERE email = ?",
    args: [email.toLowerCase()],
  });

  if (result.rows.length === 0) {
    return NextResponse.json({ ok: true });
  }

  const parentId = String(result.rows[0].id);
  const rawToken = randomUUID();
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1 Stunde

  await db.execute({
    sql: "INSERT INTO password_reset_tokens (id, parent_id, token_hash, expires_at) VALUES (?, ?, ?, ?)",
    args: [randomUUID(), parentId, tokenHash, expiresAt],
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kidsclub-app.vercel.app";
  const resetLink = `${appUrl}/passwort-reset?token=${rawToken}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "KidsClub <onboarding@resend.dev>",
    to: email.toLowerCase(),
    subject: "🔑 Passwort zurücksetzen – KidsClub",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #7c3aed; font-size: 24px;">🦊 KidsClub</h1>
        <h2 style="color: #1f2937;">Passwort zurücksetzen</h2>
        <p style="color: #4b5563;">Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt.</p>
        <p style="color: #4b5563;">Klicke auf den Button, um ein neues Passwort zu erstellen:</p>
        <a href="${resetLink}"
           style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px;
                  border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px;
                  margin: 16px 0;">
          Neues Passwort erstellen
        </a>
        <p style="color: #9ca3af; font-size: 13px;">
          Dieser Link ist <strong>1 Stunde</strong> gültig.<br>
          Wenn du keine Anfrage gestellt hast, kannst du diese E-Mail ignorieren.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
        <p style="color: #9ca3af; font-size: 12px;">KidsClub · <a href="${appUrl}" style="color: #9ca3af;">${appUrl}</a></p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
