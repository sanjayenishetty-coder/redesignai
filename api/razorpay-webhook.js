import crypto from "crypto";
import { confirmationEmailHtml } from "./email-template.js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Read raw body for signature verification
  const rawBody = await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

  // Verify Razorpay signature
  if (WEBHOOK_SECRET) {
    const signature = req.headers["x-razorpay-signature"];
    const expected = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expected) {
      console.error("Invalid Razorpay signature");
      return res.status(400).json({ error: "Invalid signature" });
    }
  }

  try {
    const payload = JSON.parse(rawBody);

    if (payload.event !== "payment.captured") {
      return res.status(200).json({ ignored: true });
    }

    const payment = payload.payload?.payment?.entity;
    if (!payment) return res.status(400).json({ error: "No payment data" });

    const customerEmail = payment.email;
    const customerPhone = payment.contact;
    const amountPaid = (payment.amount / 100).toFixed(2);

    console.log(`Payment captured: ${customerEmail}, ₹${amountPaid}`);

    // 1. Find lead in Supabase by email
    let lead = null;
    if (SUPABASE_URL && SUPABASE_KEY && customerEmail) {
      const searchRes = await fetch(
        `${SUPABASE_URL}/rest/v1/redesign_intake?email=eq.${encodeURIComponent(customerEmail)}&limit=1`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const leads = await searchRes.json();
      lead = leads?.[0] || null;

      // 2. Update status to "paid" in Supabase
      if (lead) {
        await fetch(`${SUPABASE_URL}/rest/v1/redesign_intake?id=eq.${lead.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ status: "paid" }),
        });
        console.log(`Updated lead ${lead.id} to paid`);
      }
    }

    // 3. Send confirmation email via Brevo
    if (BREVO_API_KEY && customerEmail) {
      const fullName = lead?.full_name || payment.description || "there";
      const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "REDESIGN", email: "sanjay@scaleme.in" },
          to: [{ email: customerEmail, name: fullName }],
          subject: "You're confirmed for REDESIGN! 🎉",
          htmlContent: confirmationEmailHtml({
            fullName,
            companyName: lead?.company_name || "",
            designation: lead?.designation || "",
            industry: lead?.industry || "",
            workshopGoals: lead?.workshop_goals || [],
          }),
        }),
      });

      if (!emailRes.ok) {
        const err = await emailRes.text();
        console.error("Brevo email error:", err);
      } else {
        console.log(`Confirmation email sent to ${customerEmail}`);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
