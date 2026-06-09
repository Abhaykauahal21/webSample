interface InquiryData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessStage?: string;
  websiteUrl?: string;
  projectType?: string;
  projectGoal?: string;
  budget?: string;
  timeline?: string;
  description: string;
  preferredContact?: string;
  bestTime?: string;
  hearAbout?: string;
}

const baseStyles = `
  body { margin: 0; padding: 0; background: #0C0C0C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .wrapper { background: #0C0C0C; padding: 40px 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #141414; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
  .header { background: linear-gradient(135deg, #0C0C0C 0%, #1a1a1a 100%); padding: 40px 36px; text-align: center; border-bottom: 1px solid rgba(255,140,0,0.15); }

  .header-tag { display: inline-block; padding: 6px 16px; background: rgba(255,140,0,0.12); border: 1px solid rgba(255,140,0,0.25); border-radius: 100px; color: #ff8c00; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; }
  .body { padding: 32px 36px; }
  h1 { font-size: 26px; color: #ffffff; margin: 0 0 6px; font-weight: 700; letter-spacing: -0.02em; }
  h2 { font-size: 18px; color: #ff8c00; margin: 0 0 12px; font-weight: 700; }
  .sub { color: rgba(255,255,255,0.5); font-size: 14px; margin: 0; line-height: 1.5; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th { text-align: left; padding: 10px 12px; color: rgba(255,255,255,0.35); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; border-bottom: 1px solid rgba(255,255,255,0.05); }
  td { padding: 10px 12px; color: rgba(255,255,255,0.8); font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .label { color: rgba(255,255,255,0.35); font-size: 11px; white-space: nowrap; width: 140px; vertical-align: top; }
  .value { color: rgba(255,255,255,0.85); font-size: 13px; }
  .description-box { margin-top: 16px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); border-left: 3px solid #ff8c00; }
  .description-box h3 { color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 10px; }
  .description-box p { color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; }
  .steps { margin: 24px 0; }
  .step { display: inline-block; width: 30%; vertical-align: top; text-align: center; padding: 16px 8px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.04); margin-right: 3%; }
  .step:last-child { margin-right: 0; }
  .step-num { width: 32px; height: 32px; background: #ff8c00; color: #000; border-radius: 50%; line-height: 32px; font-size: 13px; font-weight: 800; margin: 0 auto 10px; }
  .step strong { color: #fff; font-size: 12px; display: block; margin-bottom: 4px; }
  .step span { color: rgba(255,255,255,0.4); font-size: 11px; line-height: 1.4; display: block; }
  .cta { display: inline-block; padding: 14px 36px; background: #ff8c00; color: #000 !important; text-decoration: none; border-radius: 100px; font-weight: 700; font-size: 14px; margin-top: 20px; }
  .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 24px 0; }
  .sig { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); }
  .sig-avatar { width: 44px; height: 44px; background: #ff8c00; border-radius: 50%; display: inline-block; text-align: center; line-height: 44px; color: #000; font-weight: 800; font-size: 18px; vertical-align: middle; margin-right: 12px; }
  .sig-info { display: inline-block; vertical-align: middle; }
  .sig-name { color: #fff; font-weight: 700; font-size: 14px; }
  .sig-title { color: rgba(255,255,255,0.4); font-size: 11px; }
  .sig-email { color: #ff8c00; font-size: 11px; text-decoration: none; }
  .footer { text-align: center; padding: 24px 36px; border-top: 1px solid rgba(255,255,255,0.06); }
  .footer p { color: rgba(255,255,255,0.25); font-size: 11px; margin: 2px 0; }
  .badge { display: inline-block; padding: 4px 12px; background: rgba(255,140,0,0.08); border-radius: 100px; color: #ff8c00; font-size: 10px; font-weight: 600; }
`;

function fieldRow(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td class="label">${label}</td><td class="value">${value}</td></tr>`;
}

function wrapHtml(title: string, content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${baseStyles}</style>
</head>
<body>
<div class="wrapper">
  <div class="container">${content}</div>
</div>
</body>
</html>`;
}

function footerHtml(): string {
  return `<div class="footer">
    <p>ClariSolve TECH — Hyderabad, India</p>
    <p style="margin-top:4px;">vijaynadella@clarisolvetech.com</p>
  </div>`;
}

export function adminEmailTemplate(data: InquiryData): string {
  return wrapHtml("New Inquiry", `
    <div class="header">
      <div class="header-tag">New Contact Message</div>
      <h1 style="margin-top:16px;">${data.name}</h1>
      <p class="sub">New contact form submission</p>
    </div>
    <div class="body">
      <table>
        <tr><th colspan="2">Contact Information</th></tr>
        ${fieldRow("Name", data.name)}
        ${fieldRow("Email", data.email)}
        ${fieldRow("Phone", data.phone)}
      </table>
      <div class="description-box">
        <h3>Message</h3>
        <p>${data.description}</p>
      </div>
      <div class="divider"></div>
      <div class="sig">
        <div class="sig-avatar">V</div>
        <div class="sig-info">
          <div class="sig-name">Vijay Nadella</div>
          <div class="sig-title">Founder &amp; CEO, ClariSolve TECH</div>
          <a href="mailto:vijaynadella@clarisolvetech.com" class="sig-email">vijaynadella@clarisolvetech.com</a>
        </div>
      </div>
    </div>
    ${footerHtml()}
  `);
}

export function autoReplyEmailTemplate(data: InquiryData): string {
  return wrapHtml("Thank you for your inquiry", `
    <div class="header">
      <div class="header-tag">Message Received</div>
      <h1>Thanks, ${data.name.split(" ")[0]}!</h1>
      <p class="sub">We've received your message and will get back to you shortly.</p>
    </div>
    <div class="body">
      <h2>What happens next?</h2>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <strong>Review</strong>
          <span>Vijay reviews your message within 24 hours</span>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <strong>Follow-up</strong>
          <span>We reach out via email or phone</span>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <strong>Response</strong>
          <span>Receive a personalized response</span>
        </div>
      </div>

      <div class="divider"></div>

      <div style="text-align:center;">
        <a href="https://cal.com/vijaynadella" class="cta">Schedule a Call</a>
      </div>

      <div class="divider"></div>

      <div class="sig">
        <div class="sig-avatar">V</div>
        <div class="sig-info">
          <div class="sig-name">Vijay Nadella</div>
          <div class="sig-title">Founder &amp; CEO, ClariSolve TECH</div>
          <a href="mailto:vijaynadella@clarisolvetech.com" class="sig-email">vijaynadella@clarisolvetech.com</a>
        </div>
      </div>
    </div>
    ${footerHtml()}
  `);
}
