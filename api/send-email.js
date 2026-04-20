const SHARE_URL = "https://www.scaleme.in/redesign-ai";
const PAYMENT_URL = "https://rzp.io/rzp/ce6486z";

function emailWrapper(content) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">ScaleMe × ISB-CBI Hyderabad</p>
          <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:0.05em;">REDESIGN-ai</h1>
          <p style="margin:6px 0 0;color:#6b7280;font-size:13px;">A Hands-On AI Workshop for Indian SMEs</p>
        </td></tr>
        ${content}
        <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#9ca3af;font-size:12px;">
            ScaleMe · <a href="https://www.scaleme.in" style="color:#6b7280;text-decoration:none;">scaleme.in</a><br>
            ISB-CBI Hyderabad
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmationEmailHtml({ fullName, companyName, designation, industry, workshopGoals = [] }) {
  const goalsHtml = workshopGoals.length > 0
    ? workshopGoals.map(g => `<li style="margin-bottom:6px;">✓ ${g}</li>`).join("")
    : "<li>General AI adoption for business</li>";
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">You're confirmed for REDESIGN-ai! 🎉</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        Your payment is received and your seat is confirmed at <strong>REDESIGN-ai — A 2-Day Hands-On AI Workshop</strong>. We're looking forward to having you with us.
      </p>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;color:#1d4ed8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Event Details</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:80px;">Venue</td><td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">ISB-CBI Campus, Hyderabad</td></tr>
          <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;">Format</td><td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">2 full days, hands-on</td></tr>
        </table>
      </div>
      <p style="margin:0 0 10px;color:#111;font-size:14px;font-weight:700;">Your learning goals:</p>
      <ul style="margin:0 0 28px;padding-left:4px;list-style:none;color:#374151;font-size:13px;line-height:1.7;">${goalsHtml}</ul>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#166534;font-size:13px;font-weight:700;">Know someone who should be in the room?</p>
        <a href="${SHARE_URL}" style="color:#16a34a;font-size:13px;font-weight:600;text-decoration:none;">${SHARE_URL} →</a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">See you at REDESIGN-ai! 🚀<br><strong>Sanjay & The REDESIGN-ai Team</strong></p>
    </td></tr>
  `);
}

function paymentReminderEmailHtml({ fullName, companyName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">This workshop could change how you run your business</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Hi ${fullName},<br><br>You showed interest in <strong>REDESIGN-ai</strong> — your registration is still pending.</p>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#1d4ed8;font-size:13px;font-weight:700;">ISB-CBI Campus, Hyderabad</p>
        <p style="margin:0 0 16px;color:#374151;font-size:13px;line-height:1.6;">Complete your payment to confirm your place in this cohort.</p>
        <a href="${PAYMENT_URL}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">Complete My Registration →</a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Warm regards,<br><strong>Sanjay & The REDESIGN-ai Team</strong></p>
    </td></tr>
  `);
}

function followUpEmailHtml({ fullName, companyName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Following up on your REDESIGN-ai application</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Hi ${fullName},<br><br>We reached out about your application for <strong>REDESIGN-ai</strong> and wanted to follow up.</p>
      <div style="text-align:center;margin-bottom:28px;">
        <a href="${PAYMENT_URL}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;">Register Now →</a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Warm regards,<br><strong>Sanjay & The REDESIGN-ai Team</strong></p>
    </td></tr>
  `);
}

function rejectionEmailHtml({ fullName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">An update on your REDESIGN-ai application</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Hi ${fullName},<br><br>Thank you for applying to <strong>REDESIGN-ai</strong>. Unfortunately, we are unable to accommodate your registration for this cohort. We plan to run future cohorts — reply to this email to be first on the list.</p>
      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Warm regards,<br><strong>Sanjay & The REDESIGN-ai Team</strong></p>
    </td></tr>
  `);
}

function postEventEmailHtml({ fullName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Thank you for being at REDESIGN-ai 🙏</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Hi ${fullName},<br><br>It was incredible having you at <strong>REDESIGN-ai</strong>. Your 90-day AI plan starts now — reply if you hit any roadblocks.</p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 8px;color:#111;font-size:13px;font-weight:700;">Know someone who should have been in the room?</p>
        <a href="${SHARE_URL}" style="color:#2563eb;font-size:13px;font-weight:600;text-decoration:none;">${SHARE_URL} →</a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Warm regards,<br><strong>Sanjay & The REDESIGN-ai Team</strong></p>
    </td></tr>
  `);
}

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
