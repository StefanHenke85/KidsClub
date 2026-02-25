// Search
export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
}

// Chat
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

export interface FriendRequest {
  id: string;
  name: string;
  requestedAt: number;
}

// Games
export type Difficulty = "leicht" | "mittel" | "schwer";

export interface GameScore {
  game: "mathe" | "deutsch" | "logik";
  score: number;
  level: number;
  date: number;
}

export interface MathQuestion {
  num1: number;
  num2: number;
  operator: "+" | "-" | "*";
  answer: number;
}

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
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
