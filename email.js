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

export async function sendInitialEmail({ to, businessName, leadName, id }) {
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
          That’s what we install: <strong>simple automated follow-ups, reminders, promotions alerts and much more</strong>. 
          Our services are designed to be integrated into your existing website or booking software.
        </p>

        <p style="margin:16px 0 8px;">
          Here’s a 30-second demo showing where most med spas quietly lose bookings:
        </p>

        <p style="font-size:14px;">
          <a
            href="https://jouvella-automations.netlify.app/.netlify/functions/click?id=${id}"
            target="_blank"
          >
            https://www.youtube.com/watch?v=zLSM5IDC_X0
          </a>
          <br>
          <span style="color:#777;">
            (30 seconds, or search "Jouvella Automated Systems" on YouTube if you prefer)
          </span>
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

            🔗 <a href="https://www.linkedin.com/in/paul-matthew-5277b6305"
                  style="color:#666; text-decoration:none;">
              LinkedIn
            </a><br><br>

            <em>Your med spa’s growth, simplified.</em>
          </div>
        </div>
        <img
          src="https://jouvella-automations.netlify.app/.netlify/functions/open?id=${id}"
          width="1"
          height="1"
          style="display:none;"
          alt=""
        />


      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


export async function sendFollowUpEmail({ to, threadId, businessName, leadName, id }) {
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

    <p>Just wanted to follow up in case my note got buried.</p>

    <p>
      A lot of clinics get inquiries or bookings, but don’t have a system that 
      <strong>follows up, rebooks, and re-engages clients automatically</strong>.
    </p>

    <p style="margin:16px 0 8px;">
      Here’s a short demo further identifying the gap we find with most med spa businesses:
    </p>

    <p style="font-size:14px;">
      <a
        href="https://jouvella-automations.netlify.app/.netlify/functions/click?id=${id}"
        target="_blank"
      >
        https://www.youtube.com/watch?v=zLSM5IDC_X0
      </a>
      <br>
      <span style="color:#777;">
        (30 seconds, or search "Jouvella Automated Systems" on YouTube if you prefer)
      </span>
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

        🔗 <a href="https://www.linkedin.com/in/paul-matthew-5277b6305"
              style="color:#666; text-decoration:none;">
          LinkedIn
        </a><br><br>

        <em>Your med spa’s growth, simplified.</em>
      </div>
    </div>
    <img
      src="https://jouvella-automations.netlify.app/.netlify/functions/open?id=${id}"
      width="1"
      height="1"
      style="display:none;"
      alt=""
    />
  </div>
  `

  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


export async function send2ndFollowUpEmail({ to, threadId, businessName, leadName,id }) {
  const mailOptions = {
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    // subject: `Should I close the loop?`,
    inReplyTo: threadId,
    subject: `Re: Quick question about ${businessName}`,
    references: [threadId],
  html: `
  <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; padding:10px;">
    <p>Hi ${leadName},</p>

    <p>I haven’t heard back, so I’ll pause outreach on my end.</p>

    <p>
    I work with med spas to add <strong>simple automation</strong> around their existing website or booking software, 
    mainly to <strong>follow up with inquiries, re-engage past clients, and reduce manual admin</strong>.
    </p>

    <p>
    If improving follow-ups or client retention isn’t a focus right now, totally understand.
    </p>

    <p>
    If it is, I’m happy to share how this works with different booking tools, or send pricing.
    </p>

    <p>Thanks either way.</p>

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

        🔗 <a href="https://www.linkedin.com/in/paul-matthew-5277b6305"
              style="color:#666; text-decoration:none;">
          LinkedIn
        </a><br><br>

        <em>Your med spa’s growth, simplified.</em>
      </div>
    </div>
    <img
      src="https://jouvella-automations.netlify.app/.netlify/functions/open?id=${id}"
      width="1"
      height="1"
      style="display:none;"
      alt=""
    />
  </div>
`


  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}




