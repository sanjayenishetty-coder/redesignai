const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const password = req.headers["x-admin-password"];
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    // Accept single lead or array of leads
    const leads = Array.isArray(body) ? body : [body];

    const rows = leads.map((l) => ({
      full_name: l.full_name || l.fullName || "",
      email: l.email || "",
      phone: l.phone || "",
      city: l.city || "",
      company_name: l.company_name || l.companyName || "",
      designation: l.designation || "",
      industry: l.industry || "",
      team_size: l.team_size || l.teamSize || "",
      linkedin_profile: l.linkedin_profile || l.linkedinProfile || null,
      referred_by: l.referred_by || l.referredBy || null,
      company_website: l.company_website || l.companyWebsite || null,
      current_ai_usage: l.current_ai_usage || l.currentAIUsage || "",
      workshop_goals: l.workshop_goals || l.workshopGoals || [],
      biggest_challenge: l.biggest_challenge || l.biggestChallenge || null,
      specific_tools: l.specific_tools || l.specificTools || null,
      status: l.status || "new",
      notes: l.notes || null,
    }));

    const response = await fetch(`${SUPABASE_URL}/rest/v1/redesign_intake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(rows.length === 1 ? rows[0] : rows),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase error:", err);
      return res.status(500).json({ error: "Failed to add lead(s)" });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data: Array.isArray(data) ? data : [data] });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
