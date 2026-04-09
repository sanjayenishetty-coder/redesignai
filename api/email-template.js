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

        <!-- Header -->
        <tr><td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">ScaleMe × ISB Hyderabad</p>
          <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:0.05em;">REDESIGN</h1>
          <p style="margin:6px 0 0;color:#6b7280;font-size:13px;">18th & 19th April 2026 · ISB Campus, Hyderabad</p>
        </td></tr>

        ${content}

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#9ca3af;font-size:12px;">
            ScaleMe · <a href="https://www.scaleme.in" style="color:#6b7280;text-decoration:none;">scaleme.in</a><br>
            18th & 19th April 2026, ISB Hyderabad
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Email 1: Sent on form submission — interest registered, payment pending
export function interestEmailHtml({ fullName, companyName, designation, industry }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Thank you for your interest in REDESIGN</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        We've received your application for <strong>REDESIGN — A 2-Day Hands-On AI Workshop</strong> at ISB Hyderabad on <strong>18th & 19th April 2026</strong>.<br><br>
        Your spot is <strong>not confirmed yet</strong> — complete your payment to secure your seat. We have limited seats for 50 participants.
      </p>

      <!-- Application summary -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:28px;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 12px;color:#6b7280;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Your Application</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;color:#6b7280;font-size:13px;width:120px;">Name</td>
              <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#6b7280;font-size:13px;">Company</td>
              <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#6b7280;font-size:13px;">Role</td>
              <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">${designation}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#6b7280;font-size:13px;">Industry</td>
              <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">${industry}</td>
            </tr>
          </table>
        </td></tr>
      </table>

      <!-- Payment CTA -->
      <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#92400e;font-size:13px;font-weight:700;">Payment Pending — Secure Your Seat</p>
        <p style="margin:0 0 16px;color:#374151;font-size:13px;line-height:1.6;">Complete your payment to confirm your registration. Your seat will be reserved only after payment.</p>
        <a href="${PAYMENT_URL}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">Complete Payment →</a>
      </div>

      <!-- Share -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#166534;font-size:13px;font-weight:700;">Know someone who should be in the room?</p>
        <p style="margin:0 0 12px;color:#374151;font-size:13px;line-height:1.6;">Share REDESIGN with a founder or business leader who would benefit from this workshop.</p>
        <a href="${SHARE_URL}" style="color:#16a34a;font-size:13px;font-weight:600;text-decoration:none;">${SHARE_URL} →</a>
      </div>

      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        Questions? Reply to this email and we'll get back to you.<br>
        We hope to see you in Hyderabad.
      </p>
    </td></tr>
  `);
}

// Email 2: Sent manually from CRM for "new" leads — payment reminder
export function paymentReminderEmailHtml({ fullName, companyName, seatsLeft = 40 }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Seats are filling fast — complete your payment</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        You applied for <strong>REDESIGN</strong> but your seat is still not confirmed. We currently have only <strong>${seatsLeft} seats remaining</strong> out of 50 — and registrations are coming in fast.
      </p>

      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#991b1b;font-size:13px;font-weight:700;">⚠️ Your spot is not reserved yet</p>
        <p style="margin:0 0 16px;color:#374151;font-size:13px;line-height:1.6;">
          ${companyName ? `We reserved your application from ${companyName}, but` : "We have your application, but"} payment is the only thing that locks in your seat. Once we're full, we cannot accommodate late registrations.
        </p>
        <a href="${PAYMENT_URL}" style="display:inline-block;background:#dc2626;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">Secure My Seat Now →</a>
      </div>

      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;color:#6b7280;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Event Details</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;width:80px;">Date</td>
            <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">18th & 19th April 2026</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;">Venue</td>
            <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">ISB Campus, Hyderabad</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;">Seats left</td>
            <td style="padding:4px 0;color:#dc2626;font-size:13px;font-weight:700;">${seatsLeft} of 50</td>
          </tr>
        </table>
      </div>

      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        Questions before paying? Just reply to this email — we're happy to help.<br><br>
        Hope to see you in Hyderabad,<br>
        <strong>Sanjay & The REDESIGN Team</strong>
      </p>
    </td></tr>
  `);
}

// Email 3: Sent manually from CRM for "contacted" leads — follow-up
export function followUpEmailHtml({ fullName, companyName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Following up on your REDESIGN application</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        We reached out to you about your application for <strong>REDESIGN</strong> and wanted to follow up. We'd love to have ${companyName ? `someone from ${companyName}` : "you"} at the workshop — it's shaping up to be a great cohort.
      </p>

      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#1d4ed8;font-size:13px;font-weight:700;">Why founders are registering fast</p>
        <ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:13px;line-height:1.9;">
          <li>2 days at ISB Hyderabad — hands-on, no fluff</li>
          <li>Leave with a working AI system for your business</li>
          <li>Cohort of 50 SME founders — peer learning built in</li>
          <li>No coding required whatsoever</li>
        </ul>
      </div>

      <div style="text-align:center;margin-bottom:28px;">
        <a href="${PAYMENT_URL}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;">Register Now →</a>
      </div>

      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        If you have any questions or need more information before deciding, just reply to this email — I'm happy to jump on a quick call.<br><br>
        Warm regards,<br>
        <strong>Sanjay & The REDESIGN Team</strong>
      </p>
    </td></tr>
  `);
}

// Email 4: Sent manually from CRM for "rejected" leads
export function rejectionEmailHtml({ fullName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">An update on your REDESIGN application</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        Thank you for applying to <strong>REDESIGN</strong>. We genuinely appreciate your interest and the time you took to fill out your application.<br><br>
        Unfortunately, we are unable to accommodate your registration for the April 2026 cohort. Given the limited seats and the specific cohort profile we're curating, we had to make some difficult decisions.
      </p>

      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 8px;color:#111;font-size:13px;font-weight:700;">What's next</p>
        <p style="margin:0;color:#374151;font-size:13px;line-height:1.7;">
          We plan to run future cohorts of REDESIGN. If you'd like to be considered for a future batch, just reply to this email and we'll make sure you're first on the list.
        </p>
      </div>

      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        Thank you again for your interest in REDESIGN. We hope to work with you in the future.<br><br>
        Warm regards,<br>
        <strong>Sanjay & The REDESIGN Team</strong>
      </p>
    </td></tr>
  `);
}

// Email 5: Sent manually from CRM for "attended" leads — post-event
export function postEventEmailHtml({ fullName }) {
  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Thank you for being at REDESIGN 🙏</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        It was incredible having you at <strong>REDESIGN</strong>. Two days, one cohort, and a room full of people serious about building AI into their businesses — it doesn't get better than that.
      </p>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 8px;color:#166534;font-size:13px;font-weight:700;">Your 90-day AI plan starts now</p>
        <p style="margin:0;color:#374151;font-size:13px;line-height:1.7;">
          You left with a plan — now it's time to execute. If you hit any roadblocks or have questions as you implement, reply to this email. We're here to help you succeed beyond the workshop.
        </p>
      </div>

      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 8px;color:#111;font-size:13px;font-weight:700;">Know someone who should have been in the room?</p>
        <p style="margin:0 0 12px;color:#374151;font-size:13px;line-height:1.6;">Share REDESIGN with them — we'll be announcing the next cohort soon.</p>
        <a href="${SHARE_URL}" style="color:#2563eb;font-size:13px;font-weight:600;text-decoration:none;">${SHARE_URL} →</a>
      </div>

      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        Thank you for being part of this. Stay in touch.<br><br>
        Warm regards,<br>
        <strong>Sanjay & The REDESIGN Team</strong>
      </p>
    </td></tr>
  `);
}

// Email 6: Sent after payment is confirmed via Razorpay webhook
export function confirmationEmailHtml({ fullName, companyName, designation, industry, workshopGoals = [] }) {
  const goalsHtml = workshopGoals.length > 0
    ? workshopGoals.map(g => `<li style="margin-bottom:6px;">✓ ${g}</li>`).join("")
    : "<li>General AI adoption for business</li>";

  return emailWrapper(`
    <tr><td style="background:#ffffff;padding:40px 40px 32px;">
      <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">You're confirmed for REDESIGN! 🎉</h2>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
        Hi ${fullName},<br><br>
        Your payment is received and your seat is confirmed at <strong>REDESIGN — A 2-Day Hands-On AI Workshop</strong>. We're looking forward to having you with us.
      </p>

      <!-- Event details -->
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;color:#1d4ed8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Event Details</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;width:80px;">Date</td>
            <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">18th & 19th April 2026</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;">Venue</td>
            <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">ISB Campus, Hyderabad</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;">Format</td>
            <td style="padding:4px 0;color:#111;font-size:13px;font-weight:600;">2 full days, hands-on</td>
          </tr>
        </table>
      </div>

      <!-- What to expect -->
      <p style="margin:0 0 10px;color:#111;font-size:14px;font-weight:700;">What to expect:</p>
      <ul style="margin:0 0 28px;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
        <li>2 full days of hands-on AI workflow building</li>
        <li>No coding required — tools built for business operators</li>
        <li>Leave with a 90-day AI implementation plan for your business</li>
        <li>Peer cohort of 50 SME founders and operators</li>
      </ul>

      <!-- Goals -->
      <p style="margin:0 0 10px;color:#111;font-size:14px;font-weight:700;">Your learning goals:</p>
      <ul style="margin:0 0 28px;padding-left:4px;list-style:none;color:#374151;font-size:13px;line-height:1.7;">
        ${goalsHtml}
      </ul>

      <!-- Share -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#166534;font-size:13px;font-weight:700;">Know someone who should be in the room?</p>
        <p style="margin:0 0 12px;color:#374151;font-size:13px;line-height:1.6;">Share REDESIGN with a founder or business leader who would benefit.</p>
        <a href="${SHARE_URL}" style="color:#16a34a;font-size:13px;font-weight:600;text-decoration:none;">${SHARE_URL} →</a>
      </div>

      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        We'll send you more details closer to the date — venue directions, schedule, and what to bring.<br><br>
        See you in Hyderabad! 🚀<br>
        <strong>Sanjay & The REDESIGN Team</strong>
      </p>
    </td></tr>
  `);
}
