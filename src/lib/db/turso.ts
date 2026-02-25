import { createClient } from "@libsql/client";

let _client: ReturnType<typeof createClient> | null = null;

export function getDb() {
  if (!_client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) throw new Error("TURSO_DATABASE_URL nicht konfiguriert");

    _client = createClient({
      url,
      authToken,
    });
  }
  return _client;
}

export async function initDb() {
  const db = getDb();

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS parents (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS children (
      id TEXT PRIMARY KEY,
      parent_id TEXT NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      age INTEGER,
      grade INTEGER NOT NULL DEFAULT 1,
      login_code TEXT NOT NULL,
      avatar_emoji TEXT DEFAULT '🦊',
      daily_limit_minutes INTEGER DEFAULT 60,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(parent_id, login_code)
    );

    CREATE TABLE IF NOT EXISTS child_progress (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
      xp_total INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak_days INTEGER DEFAULT 0,
      last_active_date TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS game_sessions (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      game TEXT NOT NULL,
      grade INTEGER NOT NULL,
      difficulty TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      questions_total INTEGER DEFAULT 0,
      questions_correct INTEGER DEFAULT 0,
      duration_seconds INTEGER DEFAULT 0,
      played_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS screen_time_sessions (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      session_date TEXT DEFAULT (date('now')),
      minutes_used INTEGER DEFAULT 0,
      last_ping_at TEXT DEFAULT (datetime('now')),
      UNIQUE(child_id, session_date)
    );

    CREATE TABLE IF NOT EXISTS badges_earned (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      badge_id TEXT NOT NULL,
      earned_at TEXT DEFAULT (datetime('now')),
      UNIQUE(child_id, badge_id)
    );
  `);
}
