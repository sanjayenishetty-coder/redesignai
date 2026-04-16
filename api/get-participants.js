const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const PARTICIPANTS_PASSWORD = process.env.PARTICIPANTS_PASSWORD;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const password = req.headers["x-admin-password"];
  const validPasswords = [ADMIN_PASSWORD, PARTICIPANTS_PASSWORD].filter(Boolean);
  if (!password || !validPasswords.includes(password)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/redesign_intake?select=*&status=in.(paid,complimentary)&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase error:", err);
      return res.status(500).json({ error: "Failed to fetch participants" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
