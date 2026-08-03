/**
 * Transactional email.
 *
 * There is deliberately no hard dependency on a provider. If RESEND_API_KEY is
 * present, mail goes out through Resend; if it is not, `canSendEmail()` returns
 * false and the UI tells the user plainly that password reset is unavailable
 * rather than silently swallowing the request and leaving them waiting for an
 * email that will never arrive.
 *
 * To switch it on:
 *   1. Create a Resend account and verify a sending domain
 *   2. wrangler secret put RESEND_API_KEY
 *   3. Optionally: wrangler secret put EMAIL_FROM   (default below)
 */

export interface MailEnv {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}

const DEFAULT_FROM = 'Setting Out <noreply@mouneyrac.com>';

export const canSendEmail = (env: MailEnv) => Boolean(env.RESEND_API_KEY);

export interface Mail {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(env: MailEnv, mail: Mail): Promise<void> {
  if (!env.RESEND_API_KEY) {
    throw new Error('No email provider configured (RESEND_API_KEY is not set)');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM ?? DEFAULT_FROM,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Email send failed (${response.status}): ${detail.slice(0, 300)}`);
  }
}

/** Plain, short, and obviously not a phishing email. */
export function resetPasswordEmail(url: string, name?: string): Omit<Mail, 'to'> {
  const greeting = name ? `Hello ${name},` : 'Hello,';
  const text = [
    greeting,
    '',
    'Someone asked to reset the password for your Setting Out account.',
    'If that was you, open this link within the next hour:',
    '',
    url,
    '',
    'If it was not you, ignore this email — nothing has changed and your password still works.',
    '',
    'Setting Out — settingout.mouneyrac.com',
  ].join('\n');

  const html = `<!doctype html><html lang="en-AU"><body style="margin:0;padding:24px;background:#FBF3E4;font-family:system-ui,-apple-system,sans-serif;color:#1F3A2E;line-height:1.6">
  <div style="max-width:520px;margin:0 auto;background:#FFFDF7;border:2px solid #E6D6BB;border-radius:18px;padding:28px">
    <p style="margin:0 0 16px;font-size:20px;font-weight:700">Reset your password</p>
    <p style="margin:0 0 12px">${greeting}</p>
    <p style="margin:0 0 12px">Someone asked to reset the password for your Setting Out account. If that was you, use the button below within the next hour.</p>
    <p style="margin:24px 0">
      <a href="${url}" style="display:inline-block;background:#E2542B;color:#FFFDF7;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px">Choose a new password</a>
    </p>
    <p style="margin:0 0 12px;font-size:14px;color:#52705F">If the button does not work, copy this link into your browser:<br><span style="word-break:break-all">${url}</span></p>
    <p style="margin:16px 0 0;font-size:14px;color:#52705F">If it was not you, ignore this email. Nothing has changed and your password still works.</p>
    <p style="margin:24px 0 0;font-size:13px;color:#52705F">Setting Out — the professional landscaping process, applied to your own Perth block.</p>
  </div></body></html>`;

  return { subject: 'Reset your Setting Out password', text, html };
}
