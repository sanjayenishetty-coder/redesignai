import {
  confirmationEmailHtml,
  paymentReminderEmailHtml,
  followUpEmailHtml,
  rejectionEmailHtml,
  postEventEmailHtml,
} from "./_helpers/email-template.js";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const EMAIL_CONFIGS = {
  confirmation: {
    subject: "You're confirmed for REDESIGN-ai! 🎉",
    build: (data) => confirmationEmailHtml(data),
  },
  payment_reminder: {
    subject: "Your REDESIGN-ai registration is pending — here's why it's worth it",
    build: (data) => paymentReminderEmailHtml(data),
  },
  follow_up: {
    subject: "Following up on your REDESIGN-ai application",
    build: (data) => followUpEmailHtml(data),
  },
  rejection: {
    subject: "An update on your REDESIGN-ai application",
    build: (data) => rejectionEmailHtml(data),
  },
  post_event: {
    subject: "Thank you for being at REDESIGN-ai 🙏",
    build: (data) => postEventEmailHtml(data),
  },
};

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

  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { email, fullName, companyName, designation, industry, workshopGoals, emailType = "confirmation" } = body;

    if (!email) return res.status(400).json({ error: "Missing email" });

    const config = EMAIL_CONFIGS[emailType];
    if (!config) return res.status(400).json({ error: "Invalid email type" });

    const htmlContent = config.build({
      fullName: fullName || "there",
      companyName: companyName || "",
      designation: designation || "",
      industry: industry || "",
      workshopGoals: workshopGoals || [],
    });

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "REDESIGN-ai", email: "sanjay@scaleme.in" },
        to: [{ email, name: fullName || "" }],
        subject: config.subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Brevo error:", err);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
