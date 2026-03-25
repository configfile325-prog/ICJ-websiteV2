import { turso } from "../../../lib/turso";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { targetId, reason, reporter } = req.body;

  try {
    // Save to Database
    await turso.execute({
      sql: "INSERT INTO staff_reports (target_id, reason, reporter) VALUES (?, ?, ?)",
      args: [targetId, reason, reporter]
    });

    // Send PRIVATE Admin Alert
    await fetch(process.env.ADMIN_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "🚨 INTERNAL STAFF REPORT",
          color: 0x000000,
          fields: [
            { name: "Target Staff ID", value: targetId, inline: true },
            { name: "Reported By", value: reporter, inline: true },
            { name: "Reason/Evidence", value: reason }
          ]
        }]
      })
    });

    return res.status(200).json({ success: true });
  } catch (e) { return res.status(500).json({ error: "Report failed." }); }
}
