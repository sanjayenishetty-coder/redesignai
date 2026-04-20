function waitlistEmailHtml({ fullName, companyName, industry }) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:0.05em;">REDESIGN-ai</h1>
        <p style="margin:6px 0 0;color:#6b7280;font-size:13px;">A Hands-On AI Workshop for Indian SMEs</p>
      </td></tr>
      <tr><td style="background:#ffffff;padding:40px 40px 32px;">
        <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">You're on the REDESIGN-ai waitlist ✅</h2>
        <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">Hi ${fullName},<br><br>Thank you for your interest in <strong>REDESIGN-ai</strong>. We're planning the next cohort and will reach out as soon as dates are finalised — before any public announcement.</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0 0 8px;color:#166534;font-size:13px;font-weight:700;">What happens next</p>
          <ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:13px;line-height:1.9;">
            <li>We are finalising dates for the next cohort</li>
            <li>You'll hear from us before any public announcement</li>
            <li>No action needed right now</li>
          </ul>
        </div>
        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">Warm regards,<br><strong>Sanjay & The REDESIGN-ai Team</strong></p>
      </td></tr>
      <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
        <p style="margin:0;color:#9ca3af;font-size:12px;">ScaleMe · <a href="https://www.scaleme.in" style="color:#6b7280;text-decoration:none;">scaleme.in</a></p>
      </td></tr>
    </table></td></tr>
  </table>
</body></html>`;
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BREVO_API_KEY = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // 1. Save to Supabase
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/redesign_intake`, {
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
            company_name: body.companyName || "",
            designation: body.designation || "",
            industry: body.industry || "",
            team_size: body.teamSize || "",
            biggest_challenge: body.biggestChallenge || null,
            source: "waitlist",
          }),
        });
      } catch (err) {
        console.error("Supabase save failed:", err);
      }
    }

    // 2. Send confirmation email via Brevo
    if (BREVO_API_KEY && body.email) {
      try {
        const nameParts = (body.fullName || "").trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        // Add to Brevo contact list
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

        // Send waitlist confirmation email
        const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: "REDESIGN", email: "sanjay@scaleme.in" },
            to: [{ email: body.email, name: body.fullName || "" }],
            subject: "You're on the REDESIGN-ai waitlist ✅",
            htmlContent: waitlistEmailHtml({
              fullName: body.fullName,
              companyName: body.companyName,
              industry: body.industry,
            }),
          }),
        });

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error("Brevo email error:", errText);
        }
      } catch (err) {
        console.error("Brevo failed:", err);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
