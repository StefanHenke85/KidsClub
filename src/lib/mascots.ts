export interface Mascot {
  id: string;
  emoji: string;
  defaultName: string;
  hint: string;
}

export const MASCOTS: Mascot[] = [
  { id: "fuchs",    emoji: "🦊", defaultName: "Kiko",   hint: "Schlauer Fuchs" },
  { id: "faultier", emoji: "🦥", defaultName: "Fiete",  hint: "Gemütliches Faultier" },
  { id: "faultier2",emoji: "🦥", defaultName: "Frieda", hint: "Faultier-Freundin" },
  { id: "baer",     emoji: "🐻", defaultName: "Bruno",  hint: "Starker Bär" },
  { id: "eule",     emoji: "🦉", defaultName: "Olaf",   hint: "Weiser Vogel" },
  { id: "hase",     emoji: "🐰", defaultName: "Hoppel", hint: "Schneller Hase" },
  { id: "dino",     emoji: "🦕", defaultName: "Dino",   hint: "Urzeitliches Tier" },
  { id: "einhorn",  emoji: "🦄", defaultName: "Funky",  hint: "Magisches Einhorn" },
  { id: "pinguin",  emoji: "🐧", defaultName: "Pino",   hint: "Cooles Tier" },
  { id: "drachen",  emoji: "🐉", defaultName: "Drako",  hint: "Feuerspucker" },
  { id: "custom",   emoji: "⭐", defaultName: "",        hint: "Eigenes Maskottchen" },
];

export function getMascotEmoji(animal: string): string {
  return MASCOTS.find((m) => m.id === animal)?.emoji ?? "🦊";
}

export function getMascotGreeting(mascotName: string, childName: string, animal: string): string {
  const greetings: Record<string, string> = {
    faultier:  `Heeey ${childName}... ich bin ${mascotName}... 🦥 Komm, wir lernen zusammen!`,
    faultier2: `Halloooo ${childName}! Ich bin ${mascotName}! Lass uns was lernen! 🦥`,
    baer:      `Brummm! Hallo ${childName}, ich bin ${mascotName}! Auf geht's! 🐻`,
    eule:      `Huhuu ${childName}! ${mascotName} weiß alles! Frag mich! 🦉`,
    hase:      `Huhu ${childName}! Ich bin ${mascotName}, hop hop! 🐰`,
    dino:      `RAWRR! Ich bin ${mascotName}! Bereit zum Lernen? 🦕`,
    einhorn:   `✨ Hallo ${childName}! ${mascotName} ist da! Alles ist magisch! 🦄`,
    pinguin:   `Hallo ${childName}! Ich bin ${mascotName}! Wir rocken das! 🐧`,
    drachen:   `${mascotName} begrüßt dich, ${childName}! Feuer frei fürs Lernen! 🐉`,
  };
  return greetings[animal] ?? `Hallo ${childName}! Ich bin ${mascotName}! Was lernst du heute? 🌟`;
}
