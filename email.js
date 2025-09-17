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
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Quick question about ${businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.6; max-width:600px; padding:10px;">
        
        <p>Hi ${leadName} and Team,</p>

        <p>My name is <strong>Paul Matthew</strong>, and I help med spas like <strong>${businessName}</strong> get more bookings without adding extra staff.</p>

        <p>Most med spas already have a website, but very few are built to <strong>turn visitors into booked appointments automatically</strong>.</p>

        <p>We provide a ready to launch solution that integrates with your existing branding and booking system. Most clients are live within a week.</p>

        <p>Here’s a quick demo so you can see it in action:</p>

        <p>
          <a href="Demo Link" 
             style="display:inline-block; padding:12px 20px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold;">
            View Demo
          </a>
        </p>

        <p style="font-size:12px; color:#555; margin-top:5px;">
          Links are secure and lead directly to our demo site.
        </p>

        <p style="margin-top:20px; font-weight:bold; font-size:16px;">
          Would you like me to share pricing and details for how this could work for <strong>${businessName}</strong>?
        </p>

        <hr style="border:0; border-top:1px solid #ccc; margin:25px 0;">

        <p style="font-size:14px; line-height:1.5;">
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

        <p style="font-style:italic; color:#555; font-size:12px; margin-top:10px;">
          Your med spa’s growth, simplified.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}


export async function sendFollowUpEmail({ to, threadId, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Quick follow-up: ${businessName}`,
    inReplyTo: threadId,
    references: threadId,
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; padding:10px;">
        <p>Hi ${leadName},</p>

        <p>Just following up — many med spas already have websites, but very few are designed to <strong>turn visitors into booked appointments automatically</strong>.</p>

        <p>Here’s a quick demo and a <strong>30-second video</strong> showing how it works:</p>

        <p>
          <a href="https://adjoaglow.framer.website/" 
             style="display:inline-block; padding:12px 20px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold; margin-right:10px;">
            View Demo
          </a>
          <a href="https://www.youtube.com/watch?v=xK10d4FgIgk" 
             style="display:inline-block; padding:12px 20px; background:#ff0000; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold;">
            Watch Video
          </a>
        </p>

        <p style="font-size:12px; color:#555;">
          You can also verify the domains directly:<br>
          Demo: <a href="https://adjoaglow.framer.website/">https://adjoaglow.framer.website/</a><br>
          Video: <a href="https://www.youtube.com/watch?v=xK10d4FgIgk">https://www.youtube.com/watch?v=xK10d4FgIgk</a>
        </p>

        <p style="font-weight:bold; font-size:16px; margin-top:20px;">
          Would you like to schedule a quick 10-minute call to see if this could work for <strong>${businessName}</strong>, or should I send pricing?
        </p>

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

        <p style="font-style:italic; color:#555; font-size:12px; margin-top:10px;">
          You’re receiving this email because we provide services for med spas. No attachments included; all links are safe to click.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

export async function send2ndFollowUpEmail({ to, threadId, businessName, leadName }) {
  const mailOptions = {
    from: `"Paul Matthew | Jouvella Digital" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Quick peek: boost bookings at ${businessName}`,
    inReplyTo: threadId,
    references: threadId,
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; padding:10px;">
        <p>Hi ${leadName},</p>

        <p>Just wanted to make sure you saw this — med spas using our websites often see a noticeable increase in booked appointments because the sites are designed to <strong>convert visitors effortlessly</strong>.</p>

        <p>Here’s the demo and a short <strong>30-second video</strong> explaining it:</p>

        <p>
          <a href="https://adjoaglow.framer.website/" 
             style="display:inline-block; padding:12px 20px; background:#0073e6; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold; margin-right:10px;">
            View Demo
          </a>
          <a href="https://www.youtube.com/watch?v=xK10d4FgIgk" 
             style="display:inline-block; padding:12px 20px; background:#ff0000; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold;">
            Watch Video
          </a>
        </p>

        <p style="font-size:12px; color:#555;">
          Verify the links here:<br>
          Demo: <a href="https://adjoaglow.framer.website/">https://adjoaglow.framer.website/</a><br>
          Video: <a href="https://www.youtube.com/watch?v=xK10d4FgIgk">https://www.youtube.com/watch?v=xK10d4FgIgk</a>
        </p>

        <p style="font-weight:bold; font-size:16px; margin-top:20px;">
          I can send a one-page overview with pricing and next steps — would you like me to?
        </p>

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

        <p style="font-style:italic; color:#555; font-size:12px; margin-top:10px;">
          You’re receiving this email because we provide services for med spas. No attachments included; all links are safe to click.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}



