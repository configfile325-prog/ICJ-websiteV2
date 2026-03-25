import { turso } from "../../../lib/turso";

export default async function handler(req, res) {
  try {
    // 1. Staff Table
    await turso.execute(`CREATE TABLE IF NOT EXISTS staff (username TEXT PRIMARY KEY, password TEXT NOT NULL, role TEXT DEFAULT 'STAFF')`);
    
    // HARDLOCK Your Specific Admin Credentials
    await turso.execute({
      sql: "INSERT OR IGNORE INTO staff (username, password, role) VALUES (?, ?, ?)",
      args: ["admin", "Justice415", "ADMIN"]
    });

    // 2. Tickets Table (with 7-day tracking)
    await turso.execute(`CREATE TABLE IF NOT EXISTS tickets (id TEXT PRIMARY KEY, defendant_id TEXT NOT NULL, details TEXT NOT NULL, proof_img TEXT, status TEXT DEFAULT 'OPEN', created_by TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    // 3. Staff Reports Table (Internal)
    await turso.execute(`CREATE TABLE IF NOT EXISTS staff_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, target_id TEXT, reason TEXT, reporter TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    return res.status(200).json({ success: true, message: "ADMIN LOCKED: admin / Justice415" });
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
