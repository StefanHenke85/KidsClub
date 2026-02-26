// Search
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
}

// Chat (legacy Zustand-Store, wird nicht mehr aktiv genutzt)
export interface Friend {
  id: string;
  name: string;
  avatarColor: string;
  approved: boolean;
}

export interface Message {
  id: string;
  friendId: string;
  text: string;
  fromMe: boolean;
  timestamp: number;
}

// Freundschaftssystem (DB-backed)
export interface FriendRequest {
  id: string;
  fromChild: { id: string; name: string; avatarEmoji: string; friendCode: string };
  toChild: { id: string; name: string; avatarEmoji: string };
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Friendship {
  friendId: string;
  friendName: string;
  friendAvatar: string;
}

export interface ChatMessage {
  id: string;
  fromChildId: string;
  text: string;
  createdAt: string;
  fromMe: boolean;
}

// Games
export type Difficulty = "leicht" | "mittel" | "schwer";

export interface GameScore {
  game: "mathe" | "deutsch" | "logik" | "englisch" | "sachkunde";
  score: number;
  level: number;
  date: number;
}

export interface MathQuestion {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

export type GameName = "mathe" | "deutsch" | "logik" | "englisch" | "sachkunde";

export interface LogikPattern {
  sequence: string[];
  choices: string[];
  correct: string;
}

// Parent
export interface ParentSettings {
  pinHash: string;
  childName: string;
  dailyLimitMinutes: number;
  lockoutUntil?: number;
  failedAttempts: number;
}

// Homework
export interface HomeworkMessage {
  role: "user" | "assistant";
  content: string;
}

// Auth
export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  age?: number;
  grade: GradeLevel;
  loginCode: string;
  avatarEmoji: string;
  dailyLimitMinutes: number;
  createdAt: string;
}

export interface ChildProgress {
  childId: string;
  xpTotal: number;
  level: number;
  streakDays: number;
  lastActiveDate: string | null;
}

export interface BadgeEarned {
  badgeId: string;
  earnedAt: string;
}

export interface XpRewardResult {
  xpEarned: number;
  newTotal: number;
  newLevel: number;
  leveledUp: boolean;
  newBadges: BadgeEarned[];
}

export interface DashboardData {
  child: ChildProfile;
  progress: ChildProgress;
  badges: BadgeEarned[];
  todayMinutes: number;
  weekSessions: {
    day: string;
    xp: number;
    games: number;
  }[];
}
