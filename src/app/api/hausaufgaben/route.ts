import { NextRequest, NextResponse } from "next/server";
import { getKikoSystemPrompt } from "@/lib/claude";
import { verifyChildSession } from "@/lib/auth/childSession";
import type { HomeworkMessage as ChatMessage } from "@/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Bundesland aus child_session holen
  const token = req.cookies.get("child_session")?.value;
  const session = token ? await verifyChildSession(token) : null;
  const systemPrompt = getKikoSystemPrompt(session?.bundesland);

  const { messages }: { messages: ChatMessage[] } = await req.json();

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: "Keine Nachricht" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Kein API-Key konfiguriert. Bitte GROQ_API_KEY in .env.local eintragen." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 300,
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error?.message ?? "Groq Fehler");
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "";

    return new NextResponse(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
    return NextResponse.json(
      { error: `KI-Fehler: ${msg}` },
      { status: 500 }
    );
  }
}
