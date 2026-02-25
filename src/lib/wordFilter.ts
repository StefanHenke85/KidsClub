// Einfacher Wortfilter für Kinderchat
const BLOCKED_WORDS = [
  "scheiß", "scheiße", "mist", "idiot", "blödmann", "dumm", "hass",
  "töten", "sterben", "tot", "stupid", "fuck", "shit", "ass", "crap",
  "dummkopf", "vollidiot", "arsch", "ficken", "wichser",
];

export function filterMessage(text: string): { safe: boolean; filtered: string } {
  const lower = text.toLowerCase();
  let safe = true;
  let filtered = text;

  for (const word of BLOCKED_WORDS) {
    if (lower.includes(word)) {
      safe = false;
      const stars = "*".repeat(word.length);
      const regex = new RegExp(word, "gi");
      filtered = filtered.replace(regex, stars);
    }
  }

  return { safe, filtered };
}
