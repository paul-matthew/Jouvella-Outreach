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
      Project Manager | Jouvella Digital<br>
      <a href="jouvelladigital@gmail.com" style="color: #0073e6; text-decoration: none;">Email</a> | 
      <a href="https://jouvella.netlify.app/" style="color: #0073e6; text-decoration: none;">Website</a>  | 
      <a href="www.linkedin.com/in/paul-matthew-5277b6305" style="color: #0073e6; text-decoration: none;">LinkedIn</a>
    </p>
      </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

export async function sendFollowUpEmail({ to, threadId, subject, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject, // use the same subject as the original email
    inReplyTo: threadId,  // ID of the previous message
    references: threadId, // ID of the previous message
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color:#333; line-height:1.5; max-width:600px; margin:0 auto; padding:10px;">
        <p>Hi ${leadName} and Team,</p>

        <p>
          Just following up on my previous email about <strong>Jouvella Digital</strong>.
          We help med spas turn more website visitors into booked clients.
          If you’re open to it, I’d love to share a quick <strong>10-minute call</strong> to see if this could be a fit for <strong>${businessName}</strong>.
        </p>

        <p>You can preview our demo site here:</p>
        <p>
          <a href="https://adjoaglow.framer.website/" 
             style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px;">
            View Demo Site
          </a>
        </p>

        <p style="margin-top:20px;">
          Or watch a <strong>30-second intro video</strong> on our YouTube channel @Jouvella:
        </p>
        <p style="margin:20px 0; text-align:center;">
          <a href="https://www.youtube.com/watch?v=xK10d4FgIgk" target="_blank" title="Watch 30s Intro Video">
            <img src="https://img.youtube.com/vi/xK10d4FgIgk/sddefault.jpg" 
                 alt="Watch 30s Intro Video" 
                 style="width:100%; max-width:560px; height:auto; border:0; display:block; margin:0 auto;">
          </a>
        </p>

        <p style="margin-top:18px;">
          If now isn’t the right time, no worries—happy to circle back in a few months.
          Otherwise, what does your calendar look like over the next week?
        </p>

        <p>Thanks!</p>

        <hr style="border:0; border-top:1px solid #ccc; margin:20px 0;">

        <p style="font-size: 14px;">
          <strong>Best regards,</strong><br>
          Paul Matthew<br>
          Project Manager | Jouvella Digital<br>
          <a href="mailto:jouvelladigital@gmail.com" style="color: #0073e6; text-decoration: none;">Email</a> | 
          <a href="https://jouvella.netlify.app/" style="color: #0073e6; text-decoration: none;">Website</a> | 
          <a href="https://www.linkedin.com/in/paul-matthew-5277b6305" style="color: #0073e6; text-decoration: none;">LinkedIn</a>
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


