import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // must be an App Password, not your real Gmail password
  },
});

export async function sendInitialEmail({ to, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Helping ${businessName} Get More Bookings`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <p>Hello ${leadName} and Team,</p>
        <p>
        I’m with <strong>Jouvella Digital</strong>, and we help med spas get more from their websites — not just something that looks good, but a site that consistently drives new client bookings.
        </p>
        <p>
        I came across <strong>${businessName}</strong> online and believe we could add real value to your already established business. Would you be open to a quick <strong>10-minute call</strong> to explore how?
        </p>
        <p>
        To give you a visual, here’s a <strong>demo med spa website</strong> showing the features our product offers:
        </p>
        <p>
        <a href="Demo Link" style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px;"> View Demo Site </a>
        </p>
        <p>Looking forward to hearing from you.<br>
        In case we don’t connect by email, I’ll try giving you a quick call in the next few days.
        </p>
        <p>Thanks!</p>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
        <p style="font-size: 14px;">
        <strong>Best regards,</strong><br>
        Paul Matthew<br>
        Project Manager | Jouvella Digital
        </p>
      </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

export async function sendFollowUpEmail({ to, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Following up: Helping ${businessName} Grow`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; color:#333; line-height:1.5;">
        <p>Hi ${leadName} and Team,</p>
        <p>
        Just following up on my email from a few days ago about <strong>Jouvella Digital</strong>.
        We help med spas turn more website visitors into booked clients.
        If you’re open to it, I’d love to share a quick <strong>10-minute call</strong> to see if this could be a fit for <strong>${businessName}</strong>.
        </p>
        <p>You can preview our demo site here:</p>
        <p><a href="Demo Link">Demo Link</a></p>
      </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

