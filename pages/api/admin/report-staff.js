import { turso } from "../../../lib/turso";
import { verifyMember } from "../../../lib/discord-verify";

export default async function handler(req, res) {
  const { targetStaff, reason, reporterName } = req.body;

  // 1. Verify target staff is actually in the server
  const member = await verifyMember(targetStaff);
  if (!member.success) {
    return res.status(400).json({ error: "Target staff not found in Discord." });
  }

  try {
    // 2. Save report to Turso
    await turso.execute({
      sql: "INSERT INTO staff_reports (target, reporter, reason) VALUES (?, ?, ?)",
      args: [member.userId, reporterName, reason],
    });

    // 3. Alert Admin via Private Webhook
    await fetch(process.env.ADMIN_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "🚨 ICJ INTERNAL REPORT",
          color: 0xff0000,
          fields: [
            { name: "Target", value: `<@${member.userId}>`, inline: true },
            { name: "Reporter", value: reporterName, inline: true },
            { name: "Reason", value: reason }
          ]
        }]
      })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Report failed to file." });
  }
}
