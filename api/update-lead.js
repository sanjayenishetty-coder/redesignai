const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "PATCH") return res.status(405).json({ error: "Method not allowed" });

  const password = req.headers["x-admin-password"];
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const {
      id, status, notes,
      full_name, email, phone, city,
      company_name, designation, industry, team_size,
      referred_by, linkedin_profile, company_website,
      participant_type, source_channel,
    } = body;

    if (!id) return res.status(400).json({ error: "Missing id" });

    const update = {};
    if (status !== undefined) update.status = status;
    if (notes !== undefined) update.notes = notes;
    if (full_name !== undefined) update.full_name = full_name;
    if (email !== undefined) update.email = email;
    if (phone !== undefined) update.phone = phone;
    if (city !== undefined) update.city = city;
    if (company_name !== undefined) update.company_name = company_name;
    if (designation !== undefined) update.designation = designation;
    if (industry !== undefined) update.industry = industry;
    if (team_size !== undefined) update.team_size = team_size;
    if (referred_by !== undefined) update.referred_by = referred_by;
    if (linkedin_profile !== undefined) update.linkedin_profile = linkedin_profile;
    if (company_website !== undefined) update.company_website = company_website;
    if (participant_type !== undefined) update.participant_type = participant_type;
    if (source_channel !== undefined) update.source_channel = source_channel;

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/redesign_intake?id=eq.${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(update),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase error:", err);
      return res.status(500).json({ error: "Failed to update lead" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
