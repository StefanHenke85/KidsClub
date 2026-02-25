export interface EnglischWord {
  english: string;
  german: string;
  emoji: string;
  grade: number;
}

export const ENGLISCH_WORDS: EnglischWord[] = [
  // Klasse 3-4 (Grundschule)
  { english: "cat",       german: "Katze",      emoji: "🐱", grade: 3 },
  { english: "dog",       german: "Hund",       emoji: "🐶", grade: 3 },
  { english: "house",     german: "Haus",       emoji: "🏠", grade: 3 },
  { english: "school",    german: "Schule",     emoji: "🏫", grade: 3 },
  { english: "apple",     german: "Apfel",      emoji: "🍎", grade: 3 },
  { english: "water",     german: "Wasser",     emoji: "💧", grade: 3 },
  { english: "book",      german: "Buch",       emoji: "📚", grade: 3 },
  { english: "friend",    german: "Freund",     emoji: "👫", grade: 3 },
  // Klasse 5-6
  { english: "bicycle",   german: "Fahrrad",    emoji: "🚲", grade: 5 },
  { english: "weather",   german: "Wetter",     emoji: "🌤️", grade: 5 },
  { english: "family",    german: "Familie",    emoji: "👨‍👩‍👧", grade: 5 },
  { english: "holiday",   german: "Urlaub",     emoji: "✈️", grade: 5 },
  { english: "computer",  german: "Computer",   emoji: "💻", grade: 5 },
  { english: "football",  german: "Fußball",    emoji: "⚽", grade: 5 },
  // Klasse 7-9
  { english: "environment",german: "Umwelt",    emoji: "🌍", grade: 7 },
  { english: "government", german: "Regierung", emoji: "🏛️", grade: 7 },
  { english: "population", german: "Bevölkerung",emoji: "👥", grade: 7 },
  { english: "technology", german: "Technologie",emoji: "⚙️", grade: 7 },
  { english: "democracy",  german: "Demokratie",emoji: "🗳️", grade: 9 },
  { english: "parliament", german: "Parlament", emoji: "🏛️", grade: 9 },
  // Klasse 10-13
  { english: "sophisticated",german: "anspruchsvoll",emoji: "🎩", grade: 10 },
  { english: "sustainable", german: "nachhaltig",     emoji: "♻️", grade: 10 },
  { english: "consciousness",german: "Bewusstsein",   emoji: "🧠", grade: 11 },
];

export function getEnglischWordsForGrade(grade: number): EnglischWord[] {
  return ENGLISCH_WORDS.filter((w) => w.grade <= grade);
}
