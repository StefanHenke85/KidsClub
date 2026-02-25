import { NextRequest, NextResponse } from "next/server";
import type { SearchResult } from "@/types";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ results: [] });

  // Suchbegriff kindgerecht erweitern
  const safeQuery = `${q} für Kinder`;

  try {
    // DuckDuckGo Instant Answer API - kostenlos, kein Key nötig
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(safeQuery)}&format=json&no_html=1&skip_disambig=1&kp=1&kl=de-de`;

    const ddgRes = await fetch(ddgUrl, {
      headers: { "User-Agent": "KidsClubApp/1.0" },
      next: { revalidate: 300 },
    });

    const ddgData = await ddgRes.json();
    const results: SearchResult[] = [];

    // Abstract (Haupteintrag, z.B. Wikipedia)
    if (ddgData.AbstractText && ddgData.AbstractURL) {
      results.push({
        title: ddgData.Heading || q,
        url: ddgData.AbstractURL,
        snippet: ddgData.AbstractText.slice(0, 200),
        favicon: ddgData.AbstractSource
          ? `https://www.google.com/s2/favicons?domain=${ddgData.AbstractURL ? new URL(ddgData.AbstractURL).hostname : "wikipedia.org"}`
          : undefined,
      });
    }

    // RelatedTopics (weitere Ergebnisse)
    for (const topic of ddgData.RelatedTopics ?? []) {
      if (results.length >= 8) break;

      // Gruppe überspringen (hat kein direktes URL)
      if (topic.Topics) {
        for (const sub of topic.Topics) {
          if (results.length >= 8) break;
          if (sub.FirstURL && sub.Text) {
            results.push({
              title: sub.Text.split(" - ")[0] || sub.Text.slice(0, 60),
              url: sub.FirstURL,
              snippet: sub.Text.slice(0, 150),
            });
          }
        }
        continue;
      }

      if (topic.FirstURL && topic.Text) {
        results.push({
          title: topic.Text.split(" - ")[0] || topic.Text.slice(0, 60),
          url: topic.FirstURL,
          snippet: topic.Text.slice(0, 150),
        });
      }
    }

    // Fallback: Google Custom Search
    if (results.length === 0 && process.env.GOOGLE_CSE_KEY && process.env.GOOGLE_CSE_ID) {
      const gUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_CSE_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${encodeURIComponent(safeQuery)}&safe=active&lr=lang_de&num=8`;
      const gData = await fetch(gUrl).then((r) => r.json());
      if (gData.items) {
        for (const item of gData.items) {
          results.push({
            title: item.title,
            url: item.link,
            snippet: item.snippet ?? "",
            favicon: `https://www.google.com/s2/favicons?domain=${new URL(item.link).hostname}`,
          });
        }
      }
    }

    // Letzter Fallback: Vordefinierte kindgerechte Ressourcen
    if (results.length === 0) {
      const kindersites = [
        { title: `${q} – Grundschule.de`, url: `https://www.grundschule.de/suche/?q=${encodeURIComponent(q)}`, snippet: "Lernmaterialien für die Grundschule" },
        { title: `${q} – kidsweb.de`, url: `https://www.kidsweb.de/suche/${encodeURIComponent(q)}`, snippet: "Sicheres Internet für Kinder" },
        { title: `${q} – Wikipedia für Kinder`, url: `https://klexikon.zum.de/wiki/Spezial:Suche?search=${encodeURIComponent(q)}`, snippet: "Kindgerechte Erklärungen" },
        { title: `${q} – Blinde Kuh`, url: `https://www.blinde-kuh.de/suche/?q=${encodeURIComponent(q)}`, snippet: "Die Kindersuchmaschine" },
      ];
      results.push(...kindersites);
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Suche Fehler:", err);
    // Immer Fallback-Ergebnisse zeigen
    return NextResponse.json({
      results: [
        { title: `${q} – Klexikon (Wikipedia für Kinder)`, url: `https://klexikon.zum.de/wiki/Spezial:Suche?search=${encodeURIComponent(q)}`, snippet: "Kindgerechte Erklärungen zu vielen Themen" },
        { title: `${q} – Blinde Kuh Suche`, url: `https://www.blinde-kuh.de/suche/?q=${encodeURIComponent(q)}`, snippet: "Deutschlands bekannteste Kindersuchmaschine" },
        { title: `${q} – Grundschule.de`, url: `https://www.grundschule.de/suche/?q=${encodeURIComponent(q)}`, snippet: "Lernmaterialien und Erklärungen" },
      ],
    });
  }
}
