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
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.6; max-width:600px; padding:10px;">
        
        <p>Hi ${leadName} and Team,</p>

        <p>My name is <strong>Paul Matthew</strong>, and I help med spas like <strong>${businessName}</strong> get more bookings, reduce admin workload, and improve client retention.</p>

        <p>Most med spas already have a website, but very few are designed to <strong>convert visitors into booked appointments automatically</strong> using automation and follow-up systems.</p>

        <p>We provide a ready-to-launch growth system that integrates with your existing website and booking setup. Optional AI chat can also be added for extra lead capture.</p>

        <p>Here’s a quick demo so you can see it in action:</p>

        <p>
          <a href="https://adjoaglow.framer.website/" 
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

        <p>Following up — many med spas already have websites, but very few are designed to <strong>automate bookings, follow-ups, and lead capture</strong>.</p>

        <p>Here’s a quick demo and a <strong>30-second video</strong> showing how our systems work:</p>

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
          Verify links directly:<br>
          Demo: <a href="https://adjoaglow.framer.website/">https://adjoaglow.framer.website/</a><br>
          Video: <a href="https://www.youtube.com/watch?v=xK10d4FgIgk">https://www.youtube.com/watch?v=xK10d4FgIgk</a>
        </p>

        <p style="font-weight:bold; font-size:16px; margin-top:20px;">
          Would you like to schedule a short 10-minute call to see if this could work for <strong>${businessName}</strong>, or should I send over pricing?
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
          You’re receiving this email because we provide systems-first growth services for med spas. Links are safe to click; no attachments included.
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

        <p>Just checking in — med spas using our growth systems often see a noticeable increase in booked appointments because the tools are designed to <strong>automate client follow-ups and capture leads effortlessly</strong>.</p>

        <p>Here’s the demo and a short <strong>30-second video</strong> explaining how it works:</p>

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
          Verify links directly:<br>
          Demo: <a href="https://adjoaglow.framer.website/">https://adjoaglow.framer.website/</a><br>
          Video: <a href="https://www.youtube.com/watch?v=xK10d4FgIgk">https://www.youtube.com/watch?v=xK10d4FgIgk</a>
        </p>

        <p style="font-weight:bold; font-size:16px; margin-top:20px;">
          I can send a one-page overview with pricing and optional AI/chat add-ons — would you like me to?
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
          You’re receiving this email because we provide systems-first growth services for med spas. Links are safe to click; no attachments included.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}




