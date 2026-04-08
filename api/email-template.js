export function confirmationEmailHtml({ fullName, companyName, designation, industry, workshopGoals = [] }) {
  const goalsHtml = workshopGoals.length > 0
    ? workshopGoals.map(g => `<li style="margin-bottom:6px;">✓ ${g}</li>`).join("")
    : "<li>General AI adoption for business</li>";

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

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px 40px 32px;">
          <h2 style="margin:0 0 8px;color:#111;font-size:22px;font-weight:700;">Application Received ✅</h2>
          <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
            Hi ${fullName},<br><br>
            We've received your application for <strong>REDESIGN — A 2-Day Hands-On AI Workshop</strong>. We're reviewing it and will be in touch shortly.
          </p>

          <!-- Details card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;color:#6b7280;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Your Application Details</p>
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

          <!-- Goals -->
          <p style="margin:0 0 10px;color:#111;font-size:14px;font-weight:700;">What you want to achieve:</p>
          <ul style="margin:0 0 28px;padding-left:4px;list-style:none;color:#374151;font-size:13px;line-height:1.7;">
            ${goalsHtml}
          </ul>

          <!-- Next step -->
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
            <p style="margin:0 0 6px;color:#1d4ed8;font-size:13px;font-weight:700;">Next Step: Reserve Your Seat</p>
            <p style="margin:0 0 16px;color:#374151;font-size:13px;line-height:1.6;">Complete your payment to confirm your spot. Seats are limited to 50 participants.</p>
            <a href="https://rzp.io/rzp/ce6486z" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">Proceed to Payment →</a>
          </div>

          <!-- What to expect -->
          <p style="margin:0 0 10px;color:#111;font-size:14px;font-weight:700;">What to expect at REDESIGN:</p>
          <ul style="margin:0 0 28px;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
            <li>2 full days of hands-on AI workflow building</li>
            <li>No coding required — tools built for business operators</li>
            <li>Leave with a 90-day AI implementation plan for your business</li>
            <li>Peer cohort of 50 SME founders and operators</li>
            <li>Venue: ISB Campus, Hyderabad</li>
          </ul>

          <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
            Questions? Reply to this email or WhatsApp us.<br>
            We'll see you in Hyderabad. 🚀
          </p>
        </td></tr>

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
