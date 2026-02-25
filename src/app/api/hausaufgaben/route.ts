import { NextRequest, NextResponse } from "next/server";
import { KIKO_SYSTEM_PROMPT } from "@/lib/claude";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from "@/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: "Keine Nachricht" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Kein API-Key konfiguriert. Bitte GEMINI_API_KEY in .env.local eintragen." },
      { status: 503 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: KIKO_SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.3,
      },
    });

    // Verlauf ohne letzte Nachricht als History
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(readable, {
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
