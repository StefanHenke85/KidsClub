// Turso HTTP client – uses native fetch instead of @libsql/client
// @libsql/client uses WebSockets (libsql://) which are not available on Vercel Serverless.
// The Turso HTTP API works everywhere.

interface TursoResult {
  rows: Record<string, string | number | null>[];
  columns: string[];
}

interface TursoResponse {
  results?: Array<{
    response?: {
      result?: {
        rows: Array<Array<{ type: string; value: string | null }>>;
        cols: Array<{ name: string }>;
      };
      error?: { message: string };
    };
    type?: string;
    error?: { message: string };
  }>;
  error?: string;
}

function getConfig() {
  const rawUrl = process.env.TURSO_DATABASE_URL ?? "";
  const authToken = process.env.TURSO_AUTH_TOKEN ?? "";
  if (!rawUrl) throw new Error("TURSO_DATABASE_URL nicht konfiguriert");
  // Convert libsql:// → https://
  const baseUrl = rawUrl
    .replace(/^libsql:\/\//, "https://")
    .replace(/^http:\/\//, "https://");
  return { baseUrl, authToken };
}

async function tursoRequest(statements: Array<{ sql: string; args?: (string | number | null)[] }>): Promise<TursoResult[]> {
  const { baseUrl, authToken } = getConfig();

  const body = {
    requests: statements.map((s) => ({
      type: "execute",
      stmt: {
        sql: s.sql,
        args: (s.args ?? []).map((v) => {
          if (v === null) return { type: "null" };
          if (typeof v === "number") return { type: "integer", value: String(v) };
          return { type: "text", value: String(v) };
        }),
      },
    })),
  };

  const res = await fetch(`${baseUrl}/v2/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data: TursoResponse = await res.json();

  return (data.results ?? []).map((r) => {
    if (r.error) throw new Error(`Turso query error: ${r.error.message}`);
    if (r.response?.error) throw new Error(`Turso stmt error: ${r.response.error.message}`);
    const result = r.response?.result;
    if (!result) return { rows: [], columns: [] };
    const columns = result.cols.map((c) => c.name);
    const rows = result.rows.map((row) => {
      const obj: Record<string, string | number | null> = {};
      row.forEach((cell, i) => {
        const col = columns[i];
        if (cell.type === "null") obj[col] = null;
        else if (cell.type === "integer") obj[col] = parseInt(cell.value ?? "0", 10);
        else if (cell.type === "float") obj[col] = parseFloat(cell.value ?? "0");
        else obj[col] = cell.value ?? null;
      });
      return obj;
    });
    return { rows, columns };
  });
}

// Simple db interface matching @libsql/client usage pattern
interface DbClient {
  execute: (stmt: { sql: string; args?: (string | number | null)[] } | string) => Promise<TursoResult>;
}

export function getDb(): DbClient {
  return {
    execute: async (stmt) => {
      const s = typeof stmt === "string" ? { sql: stmt } : stmt;
      const results = await tursoRequest([s]);
      return results[0] ?? { rows: [], columns: [] };
    },
  };
}

export async function initDb() {
  const db = getDb();
  const statements = [
    `CREATE TABLE IF NOT EXISTS parents (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      pin_hash TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS children (
      id TEXT PRIMARY KEY,
      parent_id TEXT NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      age INTEGER,
      grade INTEGER NOT NULL DEFAULT 1,
      login_code TEXT NOT NULL,
      avatar_emoji TEXT DEFAULT '🦊',
      mascot_animal TEXT DEFAULT 'fuchs',
      mascot_name TEXT DEFAULT 'Kiko',
      daily_limit_minutes INTEGER DEFAULT 60,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(parent_id, login_code)
    )`,
    `CREATE TABLE IF NOT EXISTS child_progress (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
      xp_total INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak_days INTEGER DEFAULT 0,
      last_active_date TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS game_sessions (
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
    )`,
    `CREATE TABLE IF NOT EXISTS screen_time_sessions (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      session_date TEXT DEFAULT (date('now')),
      minutes_used INTEGER DEFAULT 0,
      last_ping_at TEXT DEFAULT (datetime('now')),
      UNIQUE(child_id, session_date)
    )`,
    `CREATE TABLE IF NOT EXISTS badges_earned (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      badge_id TEXT NOT NULL,
      earned_at TEXT DEFAULT (datetime('now')),
      UNIQUE(child_id, badge_id)
    )`,
    `CREATE TABLE IF NOT EXISTS child_school_profiles (
      id TEXT PRIMARY KEY,
      child_id TEXT NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
      school_name TEXT NOT NULL,
      city TEXT,
      grade_level INTEGER NOT NULL,
      grade_letter TEXT,
      visible INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS friend_requests (
      id TEXT PRIMARY KEY,
      from_child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      to_child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(from_child_id, to_child_id)
    )`,
    `CREATE TABLE IF NOT EXISTS friendships (
      id TEXT PRIMARY KEY,
      child_a_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      child_b_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(child_a_id, child_b_id)
    )`,
    `CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      from_child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      to_child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
  ];

  for (const sql of statements) {
    await db.execute({ sql });
  }

  // Migrations
  const migrations = [
    `ALTER TABLE parents ADD COLUMN pin_hash TEXT`,
    `ALTER TABLE children ADD COLUMN mascot_animal TEXT DEFAULT 'fuchs'`,
    `ALTER TABLE children ADD COLUMN mascot_name TEXT DEFAULT 'Kiko'`,
    `ALTER TABLE children ADD COLUMN friend_code TEXT`,
    `ALTER TABLE children ADD COLUMN bundesland TEXT DEFAULT 'NRW'`,
  ];
  for (const sql of migrations) {
    try { await db.execute({ sql }); } catch { /* column already exists */ }
  }

  // password_reset_tokens table (separate, not a migration)
  await db.execute({
    sql: `CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      parent_id TEXT NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0
    )`,
  });
}
