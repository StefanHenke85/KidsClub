import { NextRequest, NextResponse } from "next/server";
import type { SearchResult } from "@/types";

// Sichere, geprüfte Kinderseiten mit funktionierenden Suchanfragen
function safeResults(q: string): SearchResult[] {
  const enc = encodeURIComponent(q);
  return [
    {
      title: `„${q}" bei fragFINN suchen`,
      url: `https://www.fragfinn.de/?s=${enc}`,
      snippet: "fragFINN – die offizielle sichere Suchmaschine für Kinder (geprüfte Webseiten)",
      favicon: "https://www.google.com/s2/favicons?domain=fragfinn.de",
    },
    {
      title: `${q} – Klexikon (Wikipedia für Kinder)`,
      url: `https://klexikon.zum.de/wiki/Spezial:Suche?search=${enc}`,
      snippet: "Das Klexikon erklärt Themen kindgerecht – wie Wikipedia, aber für Kinder",
      favicon: "https://www.google.com/s2/favicons?domain=klexikon.zum.de",
    },
    {
      title: `${q} – kidsweb.de`,
      url: `https://www.kidsweb.de/suche/${enc}`,
      snippet: "Kindersicheres Internet mit geprüften Inhalten seit 1996",
      favicon: "https://www.google.com/s2/favicons?domain=kidsweb.de",
    },
    {
      title: `${q} – Planet Schule`,
      url: `https://www.planet-schule.de/index.php?s=${enc}`,
      snippet: "Lernvideos und Wissensartikel vom SWR & WDR für die Schule",
      favicon: "https://www.google.com/s2/favicons?domain=planet-schule.de",
    },
    {
      title: `${q} – Helles Köpfchen`,
      url: `https://www.helles-koepfchen.de/suche.html?suchwort=${enc}`,
      snippet: "Kindgerechte Antworten auf Kinderfragen – sicher und geprüft",
      favicon: "https://www.google.com/s2/favicons?domain=helles-koepfchen.de",
    },
    {
      title: `${q} – Wissen.de für Kinder`,
      url: `https://www.wissen.de/suche?q=${enc}`,
      snippet: "Lexikon und Wissen für Schule und Alltag",
      favicon: "https://www.google.com/s2/favicons?domain=wissen.de",
    },
  ];
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ results: [] });

  // fragFINN hat keine öffentliche JSON-API → wir liefern direkt
  // kuratierte Links zu geprüften Kinderseiten
  return NextResponse.json({ results: safeResults(q) });
}
