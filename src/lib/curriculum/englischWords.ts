// ─────────────────────────────────────────────────────────────────────────────
// Englisch-Vokabular nach KMK-Bildungsstandards
// Kl.3-4: Grundvokabular (A1) – Alltagsgegenstände, Familie, Tiere, Farben,
//          Zahlen, Schulwortschatz, einfache Verben
// Kl.5-6: Erweiterter Grundwortschatz (A1→A2) – Freizeit, Wetter, Wohnen,
//          Körper, Nahrung, Berufe, Jahreszeiten, Gefühle
// Kl.7-8: Gesellschaft, Umwelt, Technologie (A2→B1) – aktuelle Themen,
//          erweiterte Verben, Adjektive
// Kl.9-10: Bildungssprache (B1→B2) – Wissenschaft, Wirtschaft, Medien
// Kl.11-13: Akademisches Englisch (B2→C1) – abstrakte Konzepte, Literatur
// ─────────────────────────────────────────────────────────────────────────────

export interface EnglischWord {
  english: string;
  german: string;
  emoji: string;
  grade: number;
}

export const ENGLISCH_WORDS: EnglischWord[] = [
  // ══ Klasse 3-4: Grundvokabular A1 (Fibel-Englisch) ════════════════════════
  // Schulwortschatz
  { english: "pencil",      german: "Bleistift",    emoji: "✏️",  grade: 3 },
  { english: "ruler",       german: "Lineal",       emoji: "📏",  grade: 3 },
  { english: "rubber",      german: "Radiergummi",  emoji: "🗑️", grade: 3 },
  { english: "bag",         german: "Tasche",       emoji: "🎒",  grade: 3 },
  { english: "book",        german: "Buch",         emoji: "📚",  grade: 3 },
  { english: "pen",         german: "Stift",        emoji: "🖊️", grade: 3 },
  { english: "desk",        german: "Schreibtisch", emoji: "🪑",  grade: 3 },
  { english: "school",      german: "Schule",       emoji: "🏫",  grade: 3 },
  { english: "teacher",     german: "Lehrer/in",    emoji: "👨‍🏫", grade: 3 },
  { english: "classroom",   german: "Klassenzimmer",emoji: "🏫",  grade: 3 },
  // Zahlen & Farben
  { english: "red",         german: "rot",          emoji: "🔴",  grade: 3 },
  { english: "blue",        german: "blau",         emoji: "🔵",  grade: 3 },
  { english: "green",       german: "grün",         emoji: "🟢",  grade: 3 },
  { english: "yellow",      german: "gelb",         emoji: "🟡",  grade: 3 },
  { english: "black",       german: "schwarz",      emoji: "⚫",  grade: 3 },
  { english: "white",       german: "weiß",         emoji: "⚪",  grade: 3 },
  // Familie
  { english: "mother",      german: "Mutter",       emoji: "👩",  grade: 3 },
  { english: "father",      german: "Vater",        emoji: "👨",  grade: 3 },
  { english: "sister",      german: "Schwester",    emoji: "👧",  grade: 3 },
  { english: "brother",     german: "Bruder",       emoji: "👦",  grade: 3 },
  { english: "grandma",     german: "Oma",          emoji: "👵",  grade: 3 },
  { english: "grandpa",     german: "Opa",          emoji: "👴",  grade: 3 },
  { english: "baby",        german: "Baby",         emoji: "👶",  grade: 3 },
  // Tiere
  { english: "cat",         german: "Katze",        emoji: "🐱",  grade: 3 },
  { english: "dog",         german: "Hund",         emoji: "🐶",  grade: 3 },
  { english: "horse",       german: "Pferd",        emoji: "🐴",  grade: 3 },
  { english: "rabbit",      german: "Hase",         emoji: "🐰",  grade: 3 },
  { english: "bird",        german: "Vogel",        emoji: "🐦",  grade: 3 },
  { english: "fish",        german: "Fisch",        emoji: "🐟",  grade: 3 },
  { english: "frog",        german: "Frosch",       emoji: "🐸",  grade: 3 },
  { english: "mouse",       german: "Maus",         emoji: "🐭",  grade: 3 },
  { english: "bear",        german: "Bär",          emoji: "🐻",  grade: 3 },
  { english: "cow",         german: "Kuh",          emoji: "🐄",  grade: 3 },
  { english: "pig",         german: "Schwein",      emoji: "🐷",  grade: 3 },
  { english: "sheep",       german: "Schaf",        emoji: "🐑",  grade: 3 },
  // Alltagsgegenstände
  { english: "house",       german: "Haus",         emoji: "🏠",  grade: 3 },
  { english: "apple",       german: "Apfel",        emoji: "🍎",  grade: 3 },
  { english: "water",       german: "Wasser",       emoji: "💧",  grade: 3 },
  { english: "bread",       german: "Brot",         emoji: "🍞",  grade: 3 },
  { english: "milk",        german: "Milch",        emoji: "🥛",  grade: 3 },
  { english: "ball",        german: "Ball",         emoji: "⚽",  grade: 3 },
  { english: "flower",      german: "Blume",        emoji: "🌸",  grade: 3 },
  { english: "sun",         german: "Sonne",        emoji: "☀️",  grade: 3 },
  { english: "moon",        german: "Mond",         emoji: "🌙",  grade: 3 },
  { english: "star",        german: "Stern",        emoji: "⭐",  grade: 3 },
  { english: "tree",        german: "Baum",         emoji: "🌳",  grade: 3 },
  { english: "cold",        german: "kalt",         emoji: "🥶",  grade: 3 },
  { english: "hot",         german: "heiß",         emoji: "🔥",  grade: 3 },
  { english: "big",         german: "groß",         emoji: "🐘",  grade: 3 },
  { english: "small",       german: "klein",        emoji: "🐭",  grade: 3 },
  { english: "friend",      german: "Freund",       emoji: "👫",  grade: 3 },
  { english: "table",       german: "Tisch",        emoji: "🍽️", grade: 3 },
  { english: "chair",       german: "Stuhl",        emoji: "🪑",  grade: 3 },
  { english: "door",        german: "Tür",          emoji: "🚪",  grade: 3 },
  { english: "window",      german: "Fenster",      emoji: "🪟",  grade: 3 },

  // ══ Klasse 4: Erweiterung A1 – Berufe, Körperteile, Essen ════════════════
  { english: "doctor",      german: "Arzt/Ärztin",  emoji: "👨‍⚕️", grade: 4 },
  { english: "baker",       german: "Bäcker/in",    emoji: "👨‍🍳", grade: 4 },
  { english: "farmer",      german: "Bauer/Bäuerin",emoji: "👨‍🌾", grade: 4 },
  { english: "police",      german: "Polizist/in",  emoji: "👮",  grade: 4 },
  { english: "head",        german: "Kopf",         emoji: "🧠",  grade: 4 },
  { english: "hand",        german: "Hand",         emoji: "✋",  grade: 4 },
  { english: "foot",        german: "Fuß",          emoji: "🦶",  grade: 4 },
  { english: "eye",         german: "Auge",         emoji: "👁️", grade: 4 },
  { english: "nose",        german: "Nase",         emoji: "👃",  grade: 4 },
  { english: "mouth",       german: "Mund",         emoji: "👄",  grade: 4 },
  { english: "cake",        german: "Kuchen",       emoji: "🎂",  grade: 4 },
  { english: "egg",         german: "Ei",           emoji: "🥚",  grade: 4 },
  { english: "cheese",      german: "Käse",         emoji: "🧀",  grade: 4 },
  { english: "chicken",     german: "Hühnchen",     emoji: "🍗",  grade: 4 },
  { english: "orange",      german: "Orange",       emoji: "🍊",  grade: 4 },
  { english: "banana",      german: "Banane",       emoji: "🍌",  grade: 4 },
  { english: "strawberry",  german: "Erdbeere",     emoji: "🍓",  grade: 4 },
  { english: "bicycle",     german: "Fahrrad",      emoji: "🚲",  grade: 4 },
  { english: "car",         german: "Auto",         emoji: "🚗",  grade: 4 },
  { english: "train",       german: "Zug",          emoji: "🚂",  grade: 4 },
  { english: "plane",       german: "Flugzeug",     emoji: "✈️",  grade: 4 },
  { english: "morning",     german: "Morgen",       emoji: "🌅",  grade: 4 },
  { english: "evening",     german: "Abend",        emoji: "🌆",  grade: 4 },
  { english: "today",       german: "heute",        emoji: "📅",  grade: 4 },
  { english: "yesterday",   german: "gestern",      emoji: "⏮️", grade: 4 },
  { english: "tomorrow",    german: "morgen",       emoji: "⏭️", grade: 4 },

  // ══ Klasse 5-6: A2-Wortschatz – Freizeit, Wetter, Haus, Hobbys ══════════
  { english: "weather",     german: "Wetter",       emoji: "🌤️", grade: 5 },
  { english: "rain",        german: "Regen",        emoji: "🌧️", grade: 5 },
  { english: "snow",        german: "Schnee",       emoji: "❄️",  grade: 5 },
  { english: "cloudy",      german: "bewölkt",      emoji: "☁️",  grade: 5 },
  { english: "sunny",       german: "sonnig",       emoji: "☀️",  grade: 5 },
  { english: "windy",       german: "windig",       emoji: "💨",  grade: 5 },
  { english: "summer",      german: "Sommer",       emoji: "🏖️", grade: 5 },
  { english: "winter",      german: "Winter",       emoji: "❄️",  grade: 5 },
  { english: "spring",      german: "Frühling",     emoji: "🌱",  grade: 5 },
  { english: "autumn",      german: "Herbst",       emoji: "🍂",  grade: 5 },
  { english: "family",      german: "Familie",      emoji: "👨‍👩‍👧", grade: 5 },
  { english: "holiday",     german: "Urlaub",       emoji: "✈️",  grade: 5 },
  { english: "computer",    german: "Computer",     emoji: "💻",  grade: 5 },
  { english: "football",    german: "Fußball",      emoji: "⚽",  grade: 5 },
  { english: "library",     german: "Bibliothek",   emoji: "📚",  grade: 5 },
  { english: "hospital",    german: "Krankenhaus",  emoji: "🏥",  grade: 5 },
  { english: "mountain",    german: "Berg",         emoji: "⛰️", grade: 5 },
  { english: "ocean",       german: "Ozean",        emoji: "🌊",  grade: 5 },
  { english: "island",      german: "Insel",        emoji: "🏝️", grade: 5 },
  { english: "forest",      german: "Wald",         emoji: "🌲",  grade: 5 },
  { english: "river",       german: "Fluss",        emoji: "🏞️", grade: 5 },
  { english: "desert",      german: "Wüste",        emoji: "🏜️", grade: 5 },
  { english: "birthday",    german: "Geburtstag",   emoji: "🎂",  grade: 5 },
  { english: "breakfast",   german: "Frühstück",    emoji: "🥐",  grade: 5 },
  { english: "dinner",      german: "Abendessen",   emoji: "🍽️", grade: 5 },
  { english: "butterfly",   german: "Schmetterling",emoji: "🦋",  grade: 5 },
  { english: "elephant",    german: "Elefant",      emoji: "🐘",  grade: 5 },
  { english: "dolphin",     german: "Delfin",       emoji: "🐬",  grade: 5 },
  { english: "kitchen",     german: "Küche",        emoji: "🍳",  grade: 5 },
  { english: "garden",      german: "Garten",       emoji: "🌻",  grade: 5 },
  { english: "shopping",    german: "Einkaufen",    emoji: "🛒",  grade: 5 },
  { english: "market",      german: "Markt",        emoji: "🏪",  grade: 5 },
  { english: "sports",      german: "Sport",        emoji: "⚽",  grade: 5 },
  { english: "music",       german: "Musik",        emoji: "🎵",  grade: 5 },
  { english: "dancing",     german: "Tanzen",       emoji: "💃",  grade: 5 },
  { english: "swimming",    german: "Schwimmen",    emoji: "🏊",  grade: 5 },
  { english: "reading",     german: "Lesen",        emoji: "📖",  grade: 5 },
  { english: "cooking",     german: "Kochen",       emoji: "👨‍🍳", grade: 5 },
  { english: "painting",    german: "Malen",        emoji: "🎨",  grade: 5 },

  // ══ Klasse 6: A2-Erweiterung – Beschreibungen, einfache Satzkonstruktionen
  { english: "describe",    german: "beschreiben",  emoji: "📝",  grade: 6 },
  { english: "compare",     german: "vergleichen",  emoji: "↔️",  grade: 6 },
  { english: "explain",     german: "erklären",     emoji: "💡",  grade: 6 },
  { english: "important",   german: "wichtig",      emoji: "❗",  grade: 6 },
  { english: "beautiful",   german: "schön",        emoji: "🌸",  grade: 6 },
  { english: "dangerous",   german: "gefährlich",   emoji: "⚠️",  grade: 6 },
  { english: "interesting", german: "interessant",  emoji: "🤔",  grade: 6 },
  { english: "different",   german: "verschieden",  emoji: "↔️",  grade: 6 },
  { english: "similar",     german: "ähnlich",      emoji: "≈",   grade: 6 },
  { english: "together",    german: "zusammen",     emoji: "🤝",  grade: 6 },

  // ══ Klasse 7-8: B1-Wortschatz – Gesellschaft, Umwelt, Technologie ════════
  { english: "environment", german: "Umwelt",           emoji: "🌍", grade: 7 },
  { english: "government",  german: "Regierung",        emoji: "🏛️", grade: 7 },
  { english: "population",  german: "Bevölkerung",      emoji: "👥", grade: 7 },
  { english: "technology",  german: "Technologie",      emoji: "⚙️", grade: 7 },
  { english: "democracy",   german: "Demokratie",       emoji: "🗳️", grade: 7 },
  { english: "parliament",  german: "Parlament",        emoji: "🏛️", grade: 7 },
  { english: "economy",     german: "Wirtschaft",       emoji: "📈", grade: 7 },
  { english: "pollution",   german: "Umweltverschmutzung",emoji:"🏭",grade: 7 },
  { english: "electricity", german: "Strom",            emoji: "⚡", grade: 7 },
  { english: "gravity",     german: "Schwerkraft",      emoji: "🍎", grade: 7 },
  { english: "atmosphere",  german: "Atmosphäre",       emoji: "🌍", grade: 7 },
  { english: "climate",     german: "Klima",            emoji: "🌡️", grade: 7 },
  { english: "energy",      german: "Energie",          emoji: "⚡", grade: 7 },
  { english: "renewable",   german: "erneuerbar",       emoji: "♻️", grade: 7 },
  { english: "protest",     german: "Protest",          emoji: "✊", grade: 7 },
  { english: "rights",      german: "Rechte",           emoji: "⚖️", grade: 7 },
  { english: "freedom",     german: "Freiheit",         emoji: "🕊️", grade: 7 },
  { english: "society",     german: "Gesellschaft",     emoji: "👥", grade: 8 },
  { english: "culture",     german: "Kultur",           emoji: "🎭", grade: 8 },
  { english: "tradition",   german: "Tradition",        emoji: "🏺", grade: 8 },
  { english: "religion",    german: "Religion",         emoji: "⛪", grade: 8 },
  { english: "migration",   german: "Migration",        emoji: "✈️", grade: 8 },
  { english: "refugee",     german: "Flüchtling",       emoji: "🌍", grade: 8 },
  { english: "conflict",    german: "Konflikt",         emoji: "⚔️", grade: 8 },
  { english: "solution",    german: "Lösung",           emoji: "💡", grade: 8 },
  { english: "research",    german: "Forschung",        emoji: "🔬", grade: 8 },
  { english: "influence",   german: "Einfluss",         emoji: "🌀", grade: 8 },
  { english: "challenge",   german: "Herausforderung",  emoji: "🏔️", grade: 8 },

  // ══ Klasse 9-10: B2-Wortschatz – Wissenschaft, Wirtschaft, Medien ════════
  { english: "revolution",   german: "Revolution",      emoji: "✊", grade: 9 },
  { english: "chromosome",   german: "Chromosom",       emoji: "🧬", grade: 9 },
  { english: "metabolism",   german: "Stoffwechsel",    emoji: "⚡", grade: 9 },
  { english: "globalisation",german: "Globalisierung",  emoji: "🌐", grade: 9 },
  { english: "constitution", german: "Verfassung",      emoji: "📜", grade: 9 },
  { english: "unemployment", german: "Arbeitslosigkeit",emoji: "💼", grade: 9 },
  { english: "inflation",    german: "Inflation",       emoji: "💰", grade: 9 },
  { english: "sustainable",  german: "nachhaltig",      emoji: "♻️", grade: 10 },
  { english: "biodiversity",  german: "Biodiversität",  emoji: "🌿", grade: 10 },
  { english: "photosynthesis",german: "Photosynthese",  emoji: "🌿", grade: 10 },
  { english: "algorithm",    german: "Algorithmus",     emoji: "💻", grade: 10 },
  { english: "consciousness", german: "Bewusstsein",    emoji: "🧠", grade: 10 },
  { english: "perspective",  german: "Perspektive",     emoji: "👁️", grade: 10 },
  { english: "significant",  german: "bedeutsam",       emoji: "❗", grade: 10 },
  { english: "consequence",  german: "Konsequenz",      emoji: "⚖️", grade: 10 },
  { english: "evidence",     german: "Beweise",         emoji: "🔍", grade: 10 },

  // ══ Klasse 11-13: C1-Wortschatz – Abstrakte Konzepte, Literatur ══════════
  { english: "sophisticated",  german: "anspruchsvoll", emoji: "🎩", grade: 11 },
  { english: "phenomenon",    german: "Phänomen",       emoji: "🌟", grade: 11 },
  { english: "paradox",       german: "Paradoxon",      emoji: "🔄", grade: 11 },
  { english: "ambiguous",     german: "mehrdeutig",     emoji: "❓", grade: 11 },
  { english: "inevitable",    german: "unvermeidlich",  emoji: "⚠️", grade: 11 },
  { english: "thermodynamics",german: "Thermodynamik",  emoji: "🌡️", grade: 11 },
  { english: "electromagnetic",german:"elektromagnetisch",emoji:"⚡",grade: 11 },
  { english: "epistemology",  german: "Erkenntnistheorie",emoji:"🔍",grade: 12 },
  { english: "hermeneutics",  german: "Hermeneutik",    emoji: "📖", grade: 12 },
  { english: "stochastic",    german: "stochastisch",   emoji: "📊", grade: 12 },
  { english: "asymptote",     german: "Asymptote",      emoji: "📈", grade: 13 },
  { english: "derivative",    german: "Ableitung",      emoji: "📈", grade: 13 },
];

const usedEnglisch: Set<string> = new Set();

export function getEnglischWordsForGrade(grade: number): EnglischWord[] {
  return ENGLISCH_WORDS.filter((w) => w.grade <= grade);
}

export function getRandomEnglischWord(grade: number): EnglischWord {
  const effectiveGrade = Math.max(grade, 3);
  const pool = getEnglischWordsForGrade(effectiveGrade);
  let available = pool.filter((w) => !usedEnglisch.has(w.english));
  if (available.length === 0) {
    usedEnglisch.clear();
    available = pool;
  }
  const word = available[Math.floor(Math.random() * available.length)];
  usedEnglisch.add(word.english);
  return word;
}
