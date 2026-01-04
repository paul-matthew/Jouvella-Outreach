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

export async function sendInitialEmail({ to, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Quick question about ${businessName}`,
html: `
  <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; padding:10px;">
    <p>Hi ${leadName},</p>

    <p>
      Happy New Year🎉
    </p>

    <p>
      If someone reaches out but doesn’t book right away, do you ever hear from them again?
    </p>

    <p>
      Most med spas lose revenue because interested people never get turned into booked or returning clients.
    </p>

    <p>
      That’s what we install: simple automated follow-ups and rebooking, 
      <strong>without changing your website or booking software</strong>.
    </p>

    <p style="margin:16px 0 8px;">
      👉 <strong>Here's a 30-second demo of the problem we fix.</strong>
    </p>

    <p>
      <a href="https://adjoaglow.framer.website/"
        style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
        View Demo
      </a>
    </p>

    <p>
      I’m accepting <strong>2 new med spa clients this month</strong>.
    </p>

    <p>
      Happy to show what this could look like for <strong>${businessName}</strong>.
    </p>

    <div style="display:flex; align-items:center; font-family:Arial, sans-serif; font-size:12px; color:#666; line-height:1.4; margin-top:16px;">
      
      <!-- Profile Image -->
      <img
        src="https://jouvella.netlify.app/images/PM.jpeg"
        alt="Paul Matthew"
        width="60"
        height="60"
        style="border-radius:50%; margin-right:12px; object-fit:cover;"
      />

      <!-- Text Content -->
      <div>
        <strong style="font-size:13px; color:#333;">Paul Matthew</strong><br>
        Project Manager | Jouvella Digital<br><br>

        📧 <a href="mailto:jouvelladigital@gmail.com" style="color:#666; text-decoration:none;">
          jouvelladigital@gmail.com
        </a><br>

        🌐 <a href="https://jouvella.netlify.app" style="color:#666; text-decoration:none;">
          jouvelladigital.com
        </a><br>

        🔗 <a href="www.linkedin.com/in/paul-matthew-5277b6305"
              style="color:#666; text-decoration:none;">
          LinkedIn
        </a><br><br>

        <em>Your med spa’s growth, simplified.</em>
      </div>
    </div>

  </div>
`

  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


export async function sendFollowUpEmail({ to, threadId, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    // subject: `Following up on my note below`,
    inReplyTo: threadId,
    references: [threadId],
    subject: `Re: Quick question about ${businessName}`,  
html: `
  <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; padding:10px;">
    <p>Hi ${leadName},</p>

    <p>Just checking back in.</p>

    <p>
      A lot of clinics get inquiries or bookings, but don’t have a system that 
      <strong>follows up, rebooks, and re-engages clients automatically</strong>.
    </p>

    <p>
      Here's a 30-second showing the gap most med spas don’t see.
    </p>

    <p>
      <a href="https://adjoaglow.framer.website/"
        style="display:inline-block; padding:10px 16px; background:#0073e6; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
        View 30-Second Demo
      </a>
    </p>

    <p>
      If it’s relevant, I can send a one-page overview with pricing and real examples.
    </p>

    <div style="display:flex; align-items:center; font-family:Arial, sans-serif; font-size:12px; color:#666; line-height:1.4; margin-top:16px;">
      
      <!-- Profile Image -->
      <img
        src="https://jouvella.netlify.app/images/PM.jpeg"
        alt="Paul Matthew"
        width="60"
        height="60"
        style="border-radius:50%; margin-right:12px; object-fit:cover;"
      />

      <!-- Text Content -->
      <div>
        <strong style="font-size:13px; color:#333;">Paul Matthew</strong><br>
        Project Manager | Jouvella Digital<br><br>

        📧 <a href="mailto:jouvelladigital@gmail.com" style="color:#666; text-decoration:none;">
          jouvelladigital@gmail.com
        </a><br>

        🌐 <a href="https://jouvella.netlify.app" style="color:#666; text-decoration:none;">
          jouvelladigital.com
        </a><br>

        🔗 <a href="www.linkedin.com/in/paul-matthew-5277b6305"
              style="color:#666; text-decoration:none;">
          LinkedIn
        </a><br><br>

        <em>Your med spa’s growth, simplified.</em>
      </div>
    </div>
  </div>
  `

  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


export async function send2ndFollowUpEmail({ to, threadId, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    // subject: `Should I close the loop?`,
    inReplyTo: threadId,
    subject: `Re: Quick question about ${businessName}`,
    inReplyTo: threadId,
    references: [threadId],
  html: `
  <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; padding:10px;">
    <p>Hi ${leadName},</p>

    <p>I haven't heard back, so I'll pause outreach on my end.</p>

    <p><strong> If improving inquiry follow-ups or reducing manual admin</strong> isn’t a focus right now, totally understand.</p>

    <p>If it is, I’m happy to share how this works for clinics with different booking or send pricing.</p>

    <p>Thanks either way<p>

    <div style="display:flex; align-items:center; font-family:Arial, sans-serif; font-size:12px; color:#666; line-height:1.4; margin-top:16px;">
      
      <!-- Profile Image -->
      <img
        src="https://jouvella.netlify.app/images/PM.jpeg"
        alt="Paul Matthew"
        width="60"
        height="60"
        style="border-radius:50%; margin-right:12px; object-fit:cover;"
      />

      <!-- Text Content -->
      <div>
        <strong style="font-size:13px; color:#333;">Paul Matthew</strong><br>
        Project Manager | Jouvella Digital<br><br>

        📧 <a href="mailto:jouvelladigital@gmail.com" style="color:#666; text-decoration:none;">
          jouvelladigital@gmail.com
        </a><br>

        🌐 <a href="https://jouvella.netlify.app" style="color:#666; text-decoration:none;">
          jouvelladigital.com
        </a><br>

        🔗 <a href="www.linkedin.com/in/paul-matthew-5277b6305"
              style="color:#666; text-decoration:none;">
          LinkedIn
        </a><br><br>

        <em>Your med spa’s growth, simplified.</em>
      </div>
    </div>
  </div>
`


  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}




