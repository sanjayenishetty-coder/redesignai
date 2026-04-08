import { confirmationEmailHtml } from "./email-template.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BREVO_API_KEY = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing Supabase environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // 1. Save to Supabase
    const dbResponse = await fetch(`${SUPABASE_URL}/rest/v1/redesign_intake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: body.fullName || "",
        email: body.email || "",
        phone: body.phone || "",
        city: body.city || "",
        linkedin_profile: body.linkedinProfile || null,
        referred_by: body.referredBy || null,
        company_name: body.companyName || "",
        designation: body.designation || "",
        industry: body.industry || "",
        company_website: body.companyWebsite || null,
        team_size: body.teamSize || "",
        current_ai_usage: body.currentAIUsage || "",
        workshop_goals: body.workshopGoals || [],
        biggest_challenge: body.biggestChallenge || null,
        specific_tools: body.specificTools || null,
      }),
    });

    if (!dbResponse.ok) {
      const errorText = await dbResponse.text();
      console.error("Supabase error:", errorText);
      return res.status(500).json({ error: "Failed to save submission" });
    }

    // 2. Add contact to Brevo list
    if (BREVO_API_KEY && body.email) {
      try {
        const nameParts = (body.fullName || "").trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            email: body.email,
            updateEnabled: true,
            attributes: {
              FIRSTNAME: firstName,
              LASTNAME: lastName,
              COMPANY: body.companyName || "",
              SMS: body.phone || "",
            },
          }),
        });
      } catch (err) {
        console.error("Brevo contact add failed:", err);
      }

      // 3. Send confirmation email via Brevo
      try {
        const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: "REDESIGN", email: "sanjay@scaleme.in" },
            to: [{ email: body.email, name: body.fullName || "" }],
            subject: "Your REDESIGN application is received ✅",
            htmlContent: confirmationEmailHtml({
              fullName: body.fullName,
              companyName: body.companyName,
              designation: body.designation,
              industry: body.industry,
              workshopGoals: body.workshopGoals || [],
            }),
          }),
        });
        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error("Brevo email error:", errText);
        }
      } catch (err) {
        console.error("Brevo email send failed:", err);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
