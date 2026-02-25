export interface BadgeDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const BADGES: BadgeDefinition[] = [
  { id: "erste_aufgabe",  name: "Erste Aufgabe!",       emoji: "🎉", description: "1. Hausaufgaben-Session" },
  { id: "erstes_spiel",  name: "Spieler!",              emoji: "🎮", description: "1. Spiel beendet" },
  { id: "mathe_koenig",  name: "Mathe-König",           emoji: "👑", description: "10× Mathe gespielt" },
  { id: "deutschmeister",name: "Deutschmeister",        emoji: "📝", description: "10× Deutsch gespielt" },
  { id: "logik_fuchs",   name: "Logik-Fuchs",           emoji: "🧩", description: "10× Logik gespielt" },
  { id: "streak_3",      name: "3 Tage dabei!",         emoji: "🔥", description: "3-Tage-Streak" },
  { id: "streak_5",      name: "Fünf Tage!",            emoji: "🔥🔥", description: "5-Tage-Streak" },
  { id: "streak_7",      name: "Eine ganze Woche!",     emoji: "🏆", description: "7-Tage-Streak" },
  { id: "xp_100",        name: "100 XP!",               emoji: "⭐", description: "100 XP gesamt" },
  { id: "xp_500",        name: "500 XP!",               emoji: "🌟", description: "500 XP gesamt" },
  { id: "xp_1000",       name: "XP-Tausender",          emoji: "💎", description: "1000 XP gesamt" },
  { id: "level_5",       name: "Level 5",               emoji: "🚀", description: "Level 5 erreicht" },
  { id: "level_10",      name: "Level 10",              emoji: "🎯", description: "Level 10 erreicht" },
  { id: "perfect_game",  name: "Perfekt!",              emoji: "✨", description: "100% in einem Spiel" },
  { id: "alle_spiele",   name: "Allrounder",            emoji: "🌈", description: "Alle 3 Spieltypen gespielt" },
];

export function getBadge(id: string): BadgeDefinition | undefined {
  return BADGES.find((b) => b.id === id);
}
