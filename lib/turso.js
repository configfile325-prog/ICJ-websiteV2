import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

// This cleans out cases older than 7 days automatically
export const purgeOldTickets = async () => {
  await turso.execute("DELETE FROM tickets WHERE created_at <= date('now', '-7 days')");
};
