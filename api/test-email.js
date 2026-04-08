import { confirmationEmailHtml } from "./email-template.js";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function handler(req, res) {
  const password = req.headers["x-admin-password"] || req.query.pwd;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const to = req.query.to;
  if (!to) {
    return res.status(400).json({ error: "Missing ?to=your@email.com query param" });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: "RESEND_API_KEY is not set in environment variables" });
  }

  try {
    const html = confirmationEmailHtml({
      fullName: "Test User",
      companyName: "Test Company",
      designation: "Founder",
      industry: "IT & Software",
      workshopGoals: ["Build AI workflows for my operations"],
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "REDESIGN <sme@scaleme.in>",
        to: [to],
        subject: "Test: REDESIGN confirmation email",
        html,
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      resend_status: response.status,
      resend_response: data,
      api_key_prefix: RESEND_API_KEY.slice(0, 8) + "...",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
