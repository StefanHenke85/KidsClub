import { NextRequest, NextResponse } from "next/server";
import { hashPin, verifyPin } from "@/lib/pinHash";

export async function POST(req: NextRequest) {
  const { action, pin, hash } = await req.json();

  if (action === "set") {
    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return NextResponse.json({ error: "PIN muss 4 Ziffern haben" }, { status: 400 });
    }
    const newHash = await hashPin(pin);
    return NextResponse.json({ hash: newHash });
  }

  if (action === "verify") {
    if (!pin || !hash) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
    const valid = await verifyPin(pin, hash);
    return NextResponse.json({ valid });
  }

  return NextResponse.json({ error: "Unbekannte Aktion" }, { status: 400 });
}
