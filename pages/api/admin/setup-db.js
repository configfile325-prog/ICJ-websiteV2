import { turso } from "../../../lib/turso";

export default async function handler(req, res) {
  try {
    // 1. Create the Main Tickets Table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        defendant_id TEXT NOT NULL,
        details TEXT NOT NULL,
        proof_img TEXT,
        status TEXT DEFAULT 'OPEN',
        created_by TEXT NOT NULL,
        claimed_by TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create the Staff Reports Table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS staff_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        target TEXT NOT NULL,
        reporter TEXT NOT NULL,
        reason TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create the Settings Table (For Announcements)
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS global_settings (
        id INTEGER PRIMARY KEY,
        announcement TEXT DEFAULT 'ICJ Portal is now live and operational.'
      )
    `);

    // 4. Insert the first announcement if it doesn't exist
    await turso.execute("INSERT OR IGNORE INTO global_settings (id, announcement) VALUES (1, 'ICJ Portal Active')");

    return res.status(200).json({ 
      success: true, 
      message: "DATABASE FIXED: All ICJ tables have been created in Turso." 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      error: "Database Setup Failed", 
      details: error.message 
    });
  }
}
