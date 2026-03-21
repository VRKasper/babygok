import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendGuessNotification({
  parentEmail,
  guestName,
  babyName,
  slug,
}: {
  parentEmail: string;
  guestName: string;
  babyName: string;
  slug: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API key not configured, skipping email");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  await resend.emails.send({
    from: "Baby Gok <noreply@babygok.com>",
    to: parentEmail,
    subject: `${guestName} heeft een voorspelling gedaan voor ${babyName}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #2D2D2D;">Nieuwe voorspelling!</h2>
        <p><strong>${guestName}</strong> heeft een voorspelling gedaan voor <strong>${babyName}</strong>.</p>
        <a href="${appUrl}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #A8C5A0; color: #2D2D2D; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Bekijk resultaten
        </a>
      </div>
    `,
  });
}
