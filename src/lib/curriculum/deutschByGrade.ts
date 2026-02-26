// ─────────────────────────────────────────────────────────────────────────────
// Deutsch-Wortschatz nach KMK-Lehrplan
// Klasse 1-2: Grundwortschatz (Fibel), einfache CVC-Wörter
// Klasse 3-4: Erweiterter Grundwortschatz, Dehnungs-h, ie, ck/tz, Nomen
// Klasse 5-6: Rechtschreibregeln (Groß/Klein), Fremdwörter, Komposita
// Klasse 7-9: Fachvokabular aus Biologie/Geschichte/Geographie
// Klasse 10-13: Abstrakte Begriffe, Wissenschaftssprache
// ─────────────────────────────────────────────────────────────────────────────

export interface DeutschWord {
  word: string;
  emoji: string;
  hint: string;
  grade: number;
}

export const DEUTSCH_WORDS: DeutschWord[] = [
  // ══ Klasse 1 – Grundwortschatz Fibel (CVC, häufigste Wörter) ══════════════
  { word: "MUT",      emoji: "💪", hint: "Wer keine Angst hat, hat …",           grade: 1 },
  { word: "BAD",      emoji: "🛁", hint: "Zimmer mit Wanne",                      grade: 1 },
  { word: "EIS",      emoji: "🍦", hint: "Kalte süße Leckerei",                   grade: 1 },
  { word: "OHR",      emoji: "👂", hint: "Damit hörst du",                        grade: 1 },
  { word: "ARM",      emoji: "💪", hint: "Zwischen Schulter und Hand",             grade: 1 },
  { word: "AST",      emoji: "🌿", hint: "Zweig am Baum",                         grade: 1 },
  { word: "HUT",      emoji: "🎩", hint: "Kopfbedeckung",                          grade: 1 },
  { word: "KUH",      emoji: "🐄", hint: "Gibt Milch",                            grade: 1 },
  { word: "ZUG",      emoji: "🚂", hint: "Fährt auf Schienen",                    grade: 1 },
  { word: "TOR",      emoji: "⚽", hint: "Beim Fußball schießt man ein …",        grade: 1 },
  { word: "FEU",      emoji: "🔥", hint: "Hot! (drei Buchstaben + er)",            grade: 1 },
  { word: "WEG",      emoji: "🛤️", hint: "Pfad durch den Wald",                   grade: 1 },
  { word: "TAG",      emoji: "☀️", hint: "Wenn die Sonne scheint",                grade: 1 },
  { word: "MAL",      emoji: "✏️", hint: "Zeichen oder Zeitpunkt",                grade: 1 },
  { word: "NEU",      emoji: "🆕", hint: "Nicht alt",                             grade: 1 },
  { word: "OFT",      emoji: "🔁", hint: "Nicht selten",                          grade: 1 },
  { word: "BEIN",     emoji: "🦵", hint: "Damit gehst du",                        grade: 1 },
  { word: "KOPF",     emoji: "🧠", hint: "Ganz oben am Körper",                   grade: 1 },
  { word: "HAND",     emoji: "✋", hint: "Fünf Finger",                            grade: 1 },
  { word: "HALS",     emoji: "🧣", hint: "Verbindet Kopf und Schulter",            grade: 1 },
  { word: "FUSS",     emoji: "🦶", hint: "Unten am Bein",                         grade: 1 },
  { word: "MUND",     emoji: "👄", hint: "Damit isst und sprichst du",            grade: 1 },
  { word: "AUGE",     emoji: "👁️", hint: "Damit siehst du",                       grade: 1 },
  { word: "NASE",     emoji: "👃", hint: "Damit riechst du",                      grade: 1 },
  { word: "BAUM",     emoji: "🌳", hint: "Wächst im Wald",                        grade: 1 },
  { word: "HAUS",     emoji: "🏠", hint: "Darin wohnst du",                       grade: 1 },
  { word: "BALL",     emoji: "⚽", hint: "Damit spielst du",                      grade: 1 },
  { word: "BUCH",     emoji: "📖", hint: "Darin gibt es Geschichten",             grade: 1 },
  { word: "TUCH",     emoji: "🧣", hint: "Zum Abtrocknen oder Wärmen",            grade: 1 },
  { word: "ENTE",     emoji: "🦆", hint: "Schwimmt auf dem Teich",                grade: 1 },
  { word: "WOLF",     emoji: "🐺", hint: "Wilder Verwandter des Hundes",          grade: 1 },
  { word: "MAUS",     emoji: "🐭", hint: "Kleines Tier mit langem Schwanz",       grade: 1 },
  { word: "HUND",     emoji: "🐶", hint: "Bester Freund des Menschen",            grade: 1 },
  { word: "GRAS",     emoji: "🌿", hint: "Grüne Wiese",                           grade: 1 },

  // ══ Klasse 2 – Wörter mit sp/st, qu, Doppelkonsonanten ═══════════════════
  { word: "STERN",    emoji: "⭐", hint: "Leuchtet nachts am Himmel",             grade: 2 },
  { word: "STEIN",    emoji: "🪨", hint: "Hart und liegt auf dem Boden",          grade: 2 },
  { word: "SPIEL",    emoji: "🎮", hint: "Macht Spaß",                            grade: 2 },
  { word: "STRAHL",   emoji: "☀️", hint: "Lichtstrahl der Sonne",                 grade: 2 },
  { word: "QUARK",    emoji: "🧀", hint: "Weißes Milchprodukt",                   grade: 2 },
  { word: "QUICK",    emoji: "⚡", hint: "Sehr schnell",                          grade: 2 },
  { word: "BITTE",    emoji: "🙏", hint: "Höfliche Bitte",                        grade: 2 },
  { word: "KATZE",    emoji: "🐱", hint: "Ein Tier, das miaut",                   grade: 2 },
  { word: "LATTE",    emoji: "🪵", hint: "Schmales Brett",                        grade: 2 },
  { word: "BUTTER",   emoji: "🧈", hint: "Aufs Brot schmieren",                   grade: 2 },
  { word: "SUPPE",    emoji: "🍲", hint: "Warmes flüssiges Gericht",              grade: 2 },
  { word: "PUPPE",    emoji: "🪆", hint: "Spielzeug für Kinder",                  grade: 2 },
  { word: "BAGGER",   emoji: "🚧", hint: "Baumaschine mit großer Schaufel",       grade: 2 },
  { word: "HAMMER",   emoji: "🔨", hint: "Werkzeug zum Nageln",                   grade: 2 },
  { word: "SOMMER",   emoji: "🏖️", hint: "Die heißeste Jahreszeit",               grade: 2 },
  { word: "WINTER",   emoji: "❄️", hint: "Die kälteste Jahreszeit",               grade: 2 },
  { word: "FRÜHLING", emoji: "🌱", hint: "Alles wird grün",                       grade: 2 },
  { word: "HERBST",   emoji: "🍂", hint: "Blätter fallen",                        grade: 2 },
  { word: "WASSER",   emoji: "💧", hint: "Das trinken wir",                       grade: 2 },
  { word: "BLUME",    emoji: "🌸", hint: "Blüht im Garten",                       grade: 2 },
  { word: "PILZ",     emoji: "🍄", hint: "Wächst im Wald",                        grade: 2 },
  { word: "FLUSS",    emoji: "🏞️", hint: "Fließendes Wasser",                     grade: 2 },
  { word: "INSEL",    emoji: "🏝️", hint: "Land, das von Wasser umgeben ist",      grade: 2 },
  { word: "BRÜCKE",   emoji: "🌉", hint: "Führt über einen Fluss",                grade: 2 },
  { word: "SCHULE",   emoji: "🏫", hint: "Hier lernst du",                        grade: 2 },
  { word: "TAFEL",    emoji: "📋", hint: "Der Lehrer schreibt drauf",             grade: 2 },
  { word: "KREIDE",   emoji: "✏️", hint: "Schreibt auf die Tafel",                grade: 2 },
  { word: "STRASSE",  emoji: "🛣️", hint: "Da fahren die Autos",                   grade: 2 },
  { word: "BRILLE",   emoji: "👓", hint: "Zum besseren Sehen",                    grade: 2 },
  { word: "TRAUBE",   emoji: "🍇", hint: "Viele kleine Beeren zusammen",          grade: 2 },
  { word: "SCHERE",   emoji: "✂️", hint: "Damit schneidest du Papier",            grade: 2 },
  { word: "FROSCH",   emoji: "🐸", hint: "Grünes Tier, das quakt",               grade: 2 },
  { word: "BRIEF",    emoji: "✉️", hint: "Den schickt man per Post",              grade: 2 },

  // ══ Klasse 3 – Dehnungs-h, ie, ck/tz, Nomen (Lernwörterliste Kl.3) ══════
  { word: "STIEFEL",     emoji: "👢", hint: "Hoher Schuh",                        grade: 3 },
  { word: "RIEGEL",      emoji: "🍫", hint: "Schokoladen…",                       grade: 3 },
  { word: "SPIEGEL",     emoji: "🪞", hint: "Darin siehst du dich",               grade: 3 },
  { word: "WIESE",       emoji: "🌾", hint: "Grüne Fläche mit Gras",              grade: 3 },
  { word: "FLIEGER",     emoji: "✈️", hint: "Fliegt am Himmel",                   grade: 3 },
  { word: "SOCKE",       emoji: "🧦", hint: "Kleidung für den Fuß",               grade: 3 },
  { word: "STRECKE",     emoji: "📏", hint: "Weg von A nach B",                   grade: 3 },
  { word: "DRACHEN",     emoji: "🐉", hint: "Märchentier oder Spielzeug",          grade: 3 },
  { word: "HÄUSER",      emoji: "🏘️", hint: "Plural von Haus",                    grade: 3 },
  { word: "FELDER",      emoji: "🌾", hint: "Plural von Feld",                    grade: 3 },
  { word: "VÖGEL",       emoji: "🐦", hint: "Plural von Vogel",                   grade: 3 },
  { word: "HÜHNER",      emoji: "🐓", hint: "Plural von Huhn",                    grade: 3 },
  { word: "SCHRANK",     emoji: "🗄️", hint: "Möbel für Kleidung",                 grade: 3 },
  { word: "FRÜHSTÜCK",   emoji: "🥐", hint: "Die erste Mahlzeit",                 grade: 3 },
  { word: "SPIELPLATZ",  emoji: "🛝", hint: "Dort spielen Kinder",                grade: 3 },
  { word: "GEBURTSTAG",  emoji: "🎂", hint: "Einmal im Jahr feiern wir ihn",      grade: 3 },
  { word: "GESCHENK",    emoji: "🎁", hint: "Das bekommst du zum Geburtstag",     grade: 3 },
  { word: "FAHRRAD",     emoji: "🚲", hint: "Zweirad ohne Motor",                 grade: 3 },
  { word: "FEUERWEHR",   emoji: "🚒", hint: "Sie löscht Brände",                  grade: 3 },
  { word: "BÄCKEREI",    emoji: "🥖", hint: "Dort kaufst du Brot",                grade: 3 },
  { word: "FREUNDSCHAFT",emoji: "👫", hint: "Verbindung zwischen Freunden",       grade: 3 },
  { word: "SCHMETTERLING",emoji:"🦋", hint: "Buntes Insekt mit Flügeln",          grade: 3 },
  { word: "EICHHÖRNCHEN",emoji:"🐿️",  hint: "Sammelt Nüsse für den Winter",      grade: 3 },
  { word: "REGENBOGEN",  emoji: "🌈", hint: "Entsteht nach dem Regen",            grade: 3 },
  { word: "BLEISTIFT",   emoji: "✏️", hint: "Zum Schreiben",                      grade: 3 },
  { word: "ENTSCHULDIGUNG",emoji:"🙏",hint: "Das sagst du, wenn du Fehler machst",grade: 3 },
  { word: "FREIZEIT",    emoji: "🎉", hint: "Zeit ohne Schule und Pflichten",     grade: 3 },
  { word: "STAUBSAUGER", emoji: "🧹", hint: "Gerät zum Saubermachen",             grade: 3 },
  { word: "SCHUBLADE",   emoji: "🗃️", hint: "Zieht man auf und zu",               grade: 3 },
  { word: "HANDTUCH",    emoji: "🛁", hint: "Zum Abtrocknen",                     grade: 3 },

  // ══ Klasse 4 – Wortableitung, Vorsilben (ver-, ent-, be-), Adjektive ═════
  { word: "ABENTEUER",   emoji: "🗺️", hint: "Eine spannende Reise",               grade: 4 },
  { word: "GEHEIMNIS",   emoji: "🤫", hint: "Das weiß nicht jeder",               grade: 4 },
  { word: "ERFINDUNG",   emoji: "💡", hint: "Etwas Neues, das jemand entwickelt", grade: 4 },
  { word: "ENTDECKUNG",  emoji: "🔭", hint: "Man findet etwas Neues",             grade: 4 },
  { word: "VERHALTEN",   emoji: "🤝", hint: "Wie man sich benimmt",               grade: 4 },
  { word: "BEOBACHTUNG", emoji: "👁️", hint: "Etwas genau anschauen",              grade: 4 },
  { word: "BESCHREIBUNG",emoji: "📝", hint: "Etwas in Worten darstellen",         grade: 4 },
  { word: "SELBSTSTÄNDIG",emoji:"🧑", hint: "Ohne fremde Hilfe",                  grade: 4 },
  { word: "VERANTWORTUNG",emoji:"⚖️", hint: "Für etwas die Last tragen",          grade: 4 },
  { word: "VORBEREITUNG",emoji: "✅", hint: "Etwas im Voraus planen",             grade: 4 },
  { word: "ENTWICKLUNG", emoji: "📈", hint: "Etwas verändert sich zum Besseren",  grade: 4 },
  { word: "BEWUNDERUNG", emoji: "🌟", hint: "Jemanden toll finden",               grade: 4 },
  { word: "ENTSCHEIDUNG",emoji: "🎯", hint: "Man wählt zwischen Möglichkeiten",   grade: 4 },
  { word: "UNTERSCHIED", emoji: "↔️", hint: "Was zwei Dinge voneinander trennt",  grade: 4 },
  { word: "GEMEINSCHAFT",emoji: "🤝", hint: "Menschen, die zusammen leben",       grade: 4 },
  { word: "WELTALL",     emoji: "🌌", hint: "Dort sind Sterne und Planeten",      grade: 4 },
  { word: "PYRAMIDE",    emoji: "🔺", hint: "Altes ägyptisches Bauwerk",          grade: 4 },
  { word: "EXPEDITION",  emoji: "🧭", hint: "Eine Forschungsreise",               grade: 4 },
  { word: "RITTERBURG",  emoji: "🏰", hint: "Befestigtes mittelalterliches Gebäude", grade: 4 },
  { word: "DSCHUNGEL",   emoji: "🌿", hint: "Dichter tropischer Wald",            grade: 4 },

  // ══ Klasse 5-6 – Fremdwörter, Fachbegriffe aus Biologie & Geographie ═════
  { word: "EXPERIMENT",    emoji: "🧪", hint: "Wissenschaftlicher Versuch",       grade: 5 },
  { word: "PHOTOSYNTHESE", emoji: "🌿", hint: "Wie Pflanzen Energie erzeugen",    grade: 5 },
  { word: "MIKROSKOP",     emoji: "🔬", hint: "Macht kleine Dinge sichtbar",      grade: 5 },
  { word: "KONTINENTE",    emoji: "🗺️", hint: "Die großen Landmassen der Erde",   grade: 5 },
  { word: "ORGANISMUS",    emoji: "🦠", hint: "Ein Lebewesen",                    grade: 5 },
  { word: "ÖKOSYSTEM",     emoji: "🌱", hint: "Lebensraum mit Tieren & Pflanzen", grade: 5 },
  { word: "GRAVITATION",   emoji: "🍎", hint: "Schwerkraft der Erde",             grade: 5 },
  { word: "ATMOSPHÄRE",    emoji: "☁️", hint: "Lufthülle der Erde",               grade: 5 },
  { word: "EVOLUTION",     emoji: "🐒", hint: "Entwicklung des Lebens",           grade: 5 },
  { word: "CHLOROPHYLL",   emoji: "🍃", hint: "Grüner Farbstoff in Pflanzen",     grade: 5 },
  { word: "METAMORPHOSE",  emoji: "🦋", hint: "Verwandlung (Raupe → Falter)",     grade: 5 },
  { word: "FOTOSYNTHESE",  emoji: "☀️", hint: "Pflanzen machen Zucker aus Licht", grade: 5 },
  { word: "GEOGRAFIE",     emoji: "🌍", hint: "Wissenschaft der Erde",            grade: 5 },
  { word: "GRAMMATIK",     emoji: "📝", hint: "Regeln einer Sprache",             grade: 5 },
  { word: "BUNDESLAND",    emoji: "🗺️", hint: "Ein Teil Deutschlands (16 Stück)", grade: 5 },
  { word: "NAHRUNGSKETTE", emoji: "🔗", hint: "Wer frisst wen in der Natur",      grade: 5 },
  { word: "VERDAUUNG",     emoji: "🫁", hint: "Nahrung wird im Körper zerlegt",   grade: 5 },
  { word: "SKELETT",       emoji: "💀", hint: "Das Knochengerüst",                grade: 5 },
  { word: "BLUTKREISLAUF", emoji: "❤️", hint: "Herz pumpt Blut durch den Körper", grade: 5 },
  { word: "NERVENSYSTEM",  emoji: "🧠", hint: "Steuert den Körper",               grade: 5 },

  // ══ Klasse 6 – Grammatik: Kasus, Adjektiv-Deklination, Satzglieder ═══════
  { word: "NOMINATIV",   emoji: "📝", hint: "Der, die, das – 1. Fall",            grade: 6 },
  { word: "AKKUSATIV",   emoji: "📝", hint: "Den, die, das – 4. Fall",            grade: 6 },
  { word: "DATIV",       emoji: "📝", hint: "Dem, der, dem – 3. Fall",            grade: 6 },
  { word: "GENITIV",     emoji: "📝", hint: "Des, der, des – 2. Fall",            grade: 6 },
  { word: "ADJEKTIV",    emoji: "🎨", hint: "Eigenschaftswort",                   grade: 6 },
  { word: "SUBSTANTIV",  emoji: "📦", hint: "Nomen / Hauptwort",                  grade: 6 },
  { word: "PRONOMEN",    emoji: "👤", hint: "Fürwort (ich, du, er, sie)",         grade: 6 },
  { word: "KONJUNKTION", emoji: "🔗", hint: "Bindewort (und, oder, aber)",        grade: 6 },
  { word: "SATZGEFÜGE",  emoji: "📐", hint: "Haupt- + Nebensatz",                 grade: 6 },
  { word: "RELATIVSATZ", emoji: "📎", hint: "Nebensatz mit Relativpronomen",      grade: 6 },
  { word: "METAPHER",    emoji: "🌊", hint: "Bildhafter Vergleich (Löwe=Mut)",    grade: 6 },
  { word: "STILMITTEL",  emoji: "✍️", hint: "Methode zur Gestaltung von Texten",  grade: 6 },

  // ══ Klasse 7-9 – Fachvokabular Geschichte, Biologie, Gesellschaft ════════
  { word: "DEMOKRATIE",      emoji: "🗳️", hint: "Volksherrschaft",               grade: 7 },
  { word: "REVOLUTION",      emoji: "✊", hint: "Grundlegender politischer Wandel",grade: 7 },
  { word: "METABOLISMUS",    emoji: "⚡", hint: "Stoffwechsel des Körpers",       grade: 7 },
  { word: "IMMUNSYSTEM",     emoji: "🛡️", hint: "Verteidigung des Körpers",       grade: 7 },
  { word: "MAGNETISMUS",     emoji: "🧲", hint: "Anziehungskraft von Magneten",   grade: 7 },
  { word: "CHROMOSOM",       emoji: "🧬", hint: "Träger der Erbinformation",      grade: 7 },
  { word: "RENAISSANCE",     emoji: "🎨", hint: "Kulturelle Erneuerung 1400-1600",grade: 7 },
  { word: "REFORMATION",     emoji: "⛪", hint: "Kirchenspaltung durch Luther",   grade: 7 },
  { word: "ABSOLUTISMUS",    emoji: "👑", hint: "Alleinherrschaft des Monarchen", grade: 7 },
  { word: "INDUSTRIALISIERUNG",emoji:"🏭",hint:"Übergang zur Fabrikarbeit",       grade: 7 },
  { word: "PARLAMENTARISMUS",emoji:"🏛️", hint: "Regierung durch Parlament",       grade: 8 },
  { word: "IMPERIALISMUS",   emoji: "🌍", hint: "Mächte streben nach Kolonien",   grade: 8 },
  { word: "FASCHISMUS",      emoji: "🚫", hint: "Extrem rechte Diktatur",         grade: 8 },
  { word: "MARXISMUS",       emoji: "✊", hint: "Lehre von Marx über Klassen",    grade: 8 },
  { word: "GRUNDGESETZ",     emoji: "📜", hint: "Deutsche Verfassung seit 1949",  grade: 9 },
  { word: "BUNDESVERFASSUNG",emoji:"🏛️", hint: "Oberstes deutsches Gesetz",       grade: 9 },
  { word: "SOZIALISMUS",     emoji: "🔴", hint: "Wirtschaft im Staatseigentum",   grade: 9 },
  { word: "KAPITALISMUS",    emoji: "💰", hint: "Wirtschaft mit Privateigentum",  grade: 9 },

  // ══ Klasse 10-13 – Abstrakte Begriffe, Wissenschaftssprache ══════════════
  { word: "GLOBALISIERUNG",   emoji: "🌐", hint: "Weltweite Vernetzung",          grade: 10 },
  { word: "ALGORITHMUS",      emoji: "💻", hint: "Schritt-für-Schritt-Anleitung", grade: 10 },
  { word: "RELATIVITAET",     emoji: "🌌", hint: "Einsteins Theorie",             grade: 10 },
  { word: "BIODIVERSITAET",   emoji: "🌿", hint: "Vielfalt des Lebens",           grade: 10 },
  { word: "THERMODYNAMIK",    emoji: "🌡️", hint: "Lehre von Wärme und Energie",   grade: 10 },
  { word: "QUANTENPHYSIK",    emoji: "⚛️", hint: "Physik kleinster Teilchen",     grade: 11 },
  { word: "ELEKTROMAGNETISMUS",emoji:"⚡", hint: "Verbindung von E- und Magnetfeld",grade: 11 },
  { word: "DIFFERENTIALRECHNUNG",emoji:"📈",hint:"Ableitungen und Steigungen",    grade: 11 },
  { word: "WAHRSCHEINLICHKEIT",emoji:"🎲",hint: "Wie wahrscheinlich ist ein Ereignis",grade: 11 },
  { word: "LINEAREKOMBINATION",emoji:"➕",hint: "Vektoren linear verknüpfen",     grade: 12 },
  { word: "STOCHASTIK",       emoji: "📊", hint: "Wahrscheinlichkeitsrechnung",   grade: 12 },
  { word: "HERMENEUTIK",      emoji: "📖", hint: "Lehre vom Verstehen von Texten",grade: 13 },
  { word: "EPISTEMOLOGIE",    emoji: "🔍", hint: "Erkenntnistheorie der Philosophie",grade: 13 },
];

// Session-Pool: vermeidet Wiederholungen innerhalb einer Spielsession
const usedWords: Set<string> = new Set();

export function getWordsForGrade(grade: number): DeutschWord[] {
  return DEUTSCH_WORDS.filter((w) => w.grade <= grade);
}

export function getRandomWordForGrade(grade: number): DeutschWord {
  const pool = getWordsForGrade(grade);
  let available = pool.filter((w) => !usedWords.has(w.word));
  if (available.length === 0) {
    usedWords.clear();
    available = pool;
  }
  const word = available[Math.floor(Math.random() * available.length)];
  usedWords.add(word.word);
  return word;
}

export function scrambleWord(word: string): string[] {
  const letters = word.split("");
  const shuffled = [...letters];
  let attempts = 0;
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    attempts++;
  } while (shuffled.join("") === word && attempts < 10);
  return shuffled;
}
