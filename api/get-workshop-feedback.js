const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "redesign2026";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const pwd = req.headers["x-admin-password"];
  if (pwd !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const supabaseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/workshop_feedback?order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text();
      console.error("Supabase fetch failed:", errText);
      return res.status(500).json({ error: "Failed to fetch feedback" });
    }

    const data = await supabaseRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
