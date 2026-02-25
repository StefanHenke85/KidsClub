import { NextRequest, NextResponse } from "next/server";
import { filterMessage } from "@/lib/wordFilter";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "Kein Text" }, { status: 400 });

  const { safe, filtered } = filterMessage(text);

  if (!safe) {
    return NextResponse.json(
      { blocked: true, filtered, message: "Diese Nachricht darf nicht gesendet werden." },
      { status: 200 }
    );
  }

  return NextResponse.json({ blocked: false, text: filtered });
}
