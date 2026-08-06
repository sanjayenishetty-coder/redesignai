/**
 * "Join the Network" intake — interim capture by email.
 *
 * The ScaleMe platform CRM is the real destination for these applications, but
 * until it is live this endpoint makes sure nothing is lost: every submission
 * is emailed to the team and logged. Before this existed the form showed a
 * success message and discarded the data entirely.
 *
 * Fields are also emitted as a JSON block at the bottom of the notification so
 * they can be imported into the CRM later without retyping.
 *
 * Required env: BREVO_API_KEY
 * Optional env: APPLICATIONS_TO (default sme@scaleme.in)
 *               BREVO_SENDER_EMAIL (default sanjay@scaleme.in — must be a
 *               verified sender in Brevo)
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const TO = process.env.APPLICATIONS_TO || "sme@scaleme.in";
const SENDER = process.env.BREVO_SENDER_EMAIL || "sanjay@scaleme.in";

const REVENUE_LABELS = {
  R25_50: "₹25–50 crore",
  R50_100: "₹50–100 crore",
  R100_PLUS: "₹100+ crore",
  UNDER_25: "Below ₹25 crore",
};

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  return `<tr>
    <td style="padding:10px 0;color:#6b7280;font-size:13px;width:190px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0;color:#111;font-size:14px;font-weight:600;">${esc(value) || "—"}</td>
  </tr>`;
}

function notificationHtml(a) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;"><tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">
  <tr><td style="background:#0B2A2D;border-radius:12px 12px 0 0;padding:28px 36px;">
    <p style="margin:0 0 4px;color:#7FD4CC;font-size:11px;letter-spacing:.16em;text-transform:uppercase;">ScaleMe Network</p>
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New application — ${esc(a.name)}</h1>
    <p style="margin:6px 0 0;color:rgba(246,244,238,.7);font-size:13px;">${esc(a.company)} · ${esc(a.city)}</p>
  </td></tr>
  <tr><td style="background:#fff;padding:32px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Full name", a.name)}
      ${row("Company", a.company)}
      ${row("City", a.city)}
      ${row("Annual revenue", REVENUE_LABELS[a.revenueBand] || a.revenueBand)}
      ${row("Phone", `+91 ${a.phone}${a.whatsapp ? "  (on WhatsApp)" : ""}`)}
      ${row("Email", a.email)}
    </table>
    <div style="margin-top:26px;padding-top:22px;border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">What the business does</p>
      <p style="margin:0 0 22px;color:#111;font-size:15px;line-height:1.6;">${esc(a.what)}</p>
      <p style="margin:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Hardest problem right now</p>
      <p style="margin:0;color:#111;font-size:15px;line-height:1.6;">${esc(a.problem)}</p>
    </div>
    <div style="margin-top:26px;padding:16px 18px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
      <p style="margin:0 0 8px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:.08em;">For CRM import</p>
      <pre style="margin:0;white-space:pre-wrap;word-break:break-word;color:#374151;font-size:11.5px;font-family:ui-monospace,Menlo,monospace;">${esc(JSON.stringify(a, null, 2))}</pre>
    </div>
    <p style="margin:22px 0 0;color:#9ca3af;font-size:12px;">
      Reply directly to <a href="mailto:${esc(a.email)}" style="color:#17696B;">${esc(a.email)}</a>.
    </p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid request body" });
  }

  const application = {
    name: String(body.name ?? "").trim(),
    company: String(body.company ?? "").trim(),
    city: String(body.city ?? "").trim(),
    revenueBand: String(body.revenueBand ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    whatsapp: Boolean(body.whatsapp),
    email: String(body.email ?? "").trim(),
    what: String(body.what ?? "").trim(),
    problem: String(body.problem ?? "").trim(),
    submittedAt: new Date().toISOString(),
  };

  // Server-side validation — the client's `required` attributes are trivially bypassed.
  const missing = ["name", "company", "city", "phone", "email", "what", "problem"].filter(
    (k) => !application[k],
  );
  if (missing.length) {
    return res.status(422).json({ ok: false, error: `Missing required fields: ${missing.join(", ")}` });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(application.email)) {
    return res.status(422).json({ ok: false, error: "Enter a valid email address." });
  }
  if (!/^[0-9]{10}$/.test(application.phone)) {
    return res.status(422).json({ ok: false, error: "Enter a valid 10-digit mobile number." });
  }

  // Logged before sending, so the data survives in the function logs even if
  // the email provider is failing.
  console.log("[apply] APPLICATION", JSON.stringify(application));

  if (!BREVO_API_KEY) {
    console.error("[apply] BREVO_API_KEY is not set — application captured in logs only");
    return res.status(503).json({
      ok: false,
      error: "We couldn't submit your application. Please email sme@scaleme.in directly.",
    });
  }

  try {
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: "ScaleMe Network", email: SENDER },
        to: [{ email: TO }],
        replyTo: { email: application.email, name: application.name },
        subject: `ScaleMe application — ${application.name}, ${application.company}`,
        htmlContent: notificationHtml(application),
      }),
    });

    if (!emailRes.ok) {
      const detail = await emailRes.text();
      console.error("[apply] Brevo rejected the send:", emailRes.status, detail);
      return res.status(502).json({
        ok: false,
        error: "We couldn't submit your application. Please email sme@scaleme.in directly.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[apply] Brevo request failed:", err);
    return res.status(502).json({
      ok: false,
      error: "We couldn't submit your application. Please email sme@scaleme.in directly.",
    });
  }
}
