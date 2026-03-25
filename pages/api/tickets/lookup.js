import { turso } from "../../../lib/turso";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM tickets WHERE id = ?",
      args: [id],
    });

    if (rows.length > 0) {
      return res.status(200).json({ success: true, ticket: rows[0] });
    }
    return res.status(404).json({ success: false });
  } catch (err) {
    return res.status(500).json({ error: "Search failed." });
  }
}
