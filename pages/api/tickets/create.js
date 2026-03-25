import { turso } from "../../../lib/turso";
import { verifyMember } from "../../../lib/discord-verify";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { defendantId, details, staffName, proofImg } = req.body;

  try {
    // 1. Check if user already has 2 active tickets
    const check = await turso.execute({
      sql: "SELECT COUNT(*) as count FROM tickets WHERE defendant_id = ? AND status != 'VERIFIED'",
      args: [defendantId],
    });

    if (check.rows[0].count >= 2) {
      return res.status(400).json({ error: "LIMIT: User already has 2 active cases." });
    }

    // 2. USE THE DISCORD VERIFIER
    const member = await verifyMember(defendantId);
    if (!member.success) {
      return res.status(400).json({ error: member.error });
    }

    // 3. Generate Case ID and Save to Turso
    const caseId = `ICJ-${Math.floor(1000 + Math.random() * 9000)}`;
    await turso.execute({
      sql: "INSERT INTO tickets (id, defendant_id, details, proof_img, created_by) VALUES (?, ?, ?, ?, ?)",
      args: [caseId, member.userId, details, proofImg, staffName],
    });

    return res.status(200).json({ success: true, caseId });
  } catch (err) {
    return res.status(500).json({ error: "ICJ Database Failure." });
  }
}
