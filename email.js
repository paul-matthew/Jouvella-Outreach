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
    subject: `Quick question about ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px;">
        <p>Hi ${leadName} and Team,</p>

        <p>I run <strong>Jouvella Digital</strong>. We don’t do custom builds — we sell a ready-to-launch <strong>med spa website</strong> designed for one thing: filling calendars with bookings.</p>

        <p>Here’s a live demo:</p>
        <p>
          <a href="Demo Link" style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px;">
            View Demo Site
          </a>
        </p>

        <p>It’s plug-and-play. We drop in your logo, services, and booking system — most clients are live in under 7 days.</p>

        <p>Would you like me to send pricing and details?</p>

        <hr style="border:0; border-top:1px solid #ccc; margin:20px 0;">

        <p style="font-size:14px;">
          <strong>Best regards,</strong><br>
          Paul Matthew<br>
          Project Manager | Jouvella Digital<br>
          <a href="mailto:jouvelladigital@gmail.com" style="color:#0073e6;">Email</a> | 
          <a href="https://jouvella.netlify.app/" style="color:#0073e6;">Website</a> | 
          <a href="https://www.linkedin.com/in/paul-matthew-5277b6305" style="color:#0073e6;">LinkedIn</a>
        </p>

        <p style="text-align:left; margin-top:20px;">
          <img src="https://raw.githubusercontent.com/paul-matthew/jouvella/refs/heads/main/images/ogimage.png" 
               alt="Jouvella Digital Logo" 
               style="width:150px; height:auto; display:block;">
        </p>

        <p style="font-style:italic; color:#555;">Your med spa’s growth, simplified.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


export async function sendFollowUpEmail({ to, threadId, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Fill more treatment slots without more staff`,
    inReplyTo: threadId,
    references: threadId,
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px;">
        <p>Hi ${leadName},</p>

        <p>I wanted to circle back because many med spas already have a site — but very few have one built to <strong>convert visitors into booked treatments</strong>.</p>

        <p>That’s exactly what our product does. Here’s the demo if you haven’t had a chance yet:</p>
        <p>
          <a href="https://adjoaglow.framer.website/" 
             style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px;">
            View Demo Site
          </a>
        </p>

        <p>It’s plug-and-play, branded to <strong>${businessName}</strong>, and usually live within a week. No heavy lifting on your side.</p>

        <p>Would it make sense to schedule a quick <strong>10-minute call</strong>, or should I simply send you pricing to review?</p>

        <hr style="border:0; border-top:1px solid #ccc; margin:20px 0;">

        <p style="font-size:14px;">
          <strong>Best regards,</strong><br>
          Paul Matthew<br>
          Project Manager | Jouvella Digital<br>
          <a href="mailto:jouvelladigital@gmail.com" style="color:#0073e6;">Email</a> | 
          <a href="https://jouvella.netlify.app/" style="color:#0073e6;">Website</a> | 
          <a href="https://www.linkedin.com/in/paul-matthew-5277b6305" style="color:#0073e6;">LinkedIn</a>
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

export async function sendTempFollowUpEmail({ to, threadId, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Fill more treatment slots`,
    inReplyTo: threadId,
    references: threadId,
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px;">
        <p>Hi ${leadName},</p>

        <p>I wanted to circle back because many med spas already have a site — but very few have one built to <strong>convert visitors into booked treatments</strong>.</p>

        <p>That’s exactly what our product does. Here’s the demo if you haven’t had a chance yet:</p>
        <p>
          <a href="https://adjoaglow.framer.website/" 
             style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px;">
            View Demo Site
          </a>
        </p>

        <p>It’s plug-and-play, branded to <strong>${businessName}</strong>, and usually live within a week. No heavy lifting on your side.</p>

        <p>Would it make sense to schedule a quick <strong>10-minute call</strong>, or should I simply send you pricing to review?</p>

        <hr style="border:0; border-top:1px solid #ccc; margin:20px 0;">

        <p style="font-size:14px;">
          <strong>Best regards,</strong><br>
          Paul Matthew<br>
          Project Manager | Jouvella Digital<br>
          <a href="mailto:jouvelladigital@gmail.com" style="color:#0073e6;">Email</a> | 
          <a href="https://jouvella.netlify.app/" style="color:#0073e6;">Website</a> | 
          <a href="https://www.linkedin.com/in/paul-matthew-5277b6305" style="color:#0073e6;">LinkedIn</a>
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}



