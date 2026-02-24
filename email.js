import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function signature() {
  return `

– Paul
Jouvella Digital
jouvelladigital.com
`;
}

/* ---------------- INITIAL EMAIL ---------------- */

export async function sendInitialEmail({ to, businessName, leadName, id }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Missed bookings at ${businessName}`,
    text: `Hi ${businessName},

I help med spas recover missed inquiries and increase repeat bookings by installing simple follow-up systems.

If improving client retention is a priority this year, I can send a short overview.

Should I?${signature()}`
  };

  return transporter.sendMail(mailOptions);
}

/* ---------------- FOLLOW UP #1 ---------------- */

export async function sendFollowUpEmail({ to, threadId, businessName, leadName, id }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Re: Missed bookings at ${businessName}`,
    inReplyTo: threadId,
    references: [threadId],
    text: `Hi ${businessName},

Just wanted to follow up on this.

Should I send the overview?${signature()}`
  };

  return transporter.sendMail(mailOptions);
}

/* ---------------- FOLLOW UP #2 ---------------- */

export async function send2ndFollowUpEmail({ to, threadId, businessName, leadName, id }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Re: Missed bookings at ${businessName}`,
    inReplyTo: threadId,
    references: [threadId],
    text: `Hi ${businessName},

No worries if this isn’t a focus right now.

If you'd like details on how clinics recover missed inquiries and rebook past clients automatically, I’m happy to send it over.

Thanks either way.${signature()}`
  };

  return transporter.sendMail(mailOptions);
}