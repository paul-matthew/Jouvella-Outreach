import { getPendingLeads, getLeadsNeedingFollowup, getLeadsNeeding2ndFollowup, updateRecord } from "./airtable.js";
import { sendInitialEmail, sendFollowUpEmail,send2ndFollowUpEmail } from "./email.js";

function isBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const hour = now.getHours();
  return day >= 1 && day <= 6 && hour >= 7 && hour < 24; // Mon-Sat, 07:00–19:00
}

function getIsoDate() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Workflow 1: Initial Cold Outreach */
async function runOutreach() {
  console.log("🚀 Starting Cold Outreach workflow...");
  if (!isBusinessHours()) {
    console.log("⏸ Not within business hours, skipping.");
    return;
  }

  console.log("📡 Fetching pending leads from Airtable...");
  const leads = await getPendingLeads();
  console.log(`✅ Found ${leads.length} lead(s) to process.`);

  if (leads.length === 0) {
    console.log("ℹ️ No pending leads, exiting.");
    return;
  }

  const today = getIsoDate();

  for (const [index, lead] of leads.entries()) {
    console.log(`\n➡️ [${index + 1}/${leads.length}] Processing lead: ${lead.businessName} <${lead.email}>`);
    try {
      const emailResponse = await sendInitialEmail({
        to: lead.email,
        businessName: lead.businessName,
        leadName: lead.leadName,
      });

      await updateRecord(lead.id, {
        "Cold Outreach Step": "2026 Initial Msg Sent",
        "Date of 2026 Initial Email": today,
        "Thread ID": emailResponse.messageId || "(no messageId)",
        "Email Sent 2026": "Yes",
        "Email Count":1
      });

      console.log(`✅ Initial sent to ${lead.businessName}`);
    } catch (err) {
      console.error(`❌ Error sending initial to ${lead.email}:`, err?.message || err);
      console.error("🔎 Full error dump:", JSON.stringify(err, null, 2));
      await updateRecord(lead.id, {
        "Email Sent 2026": "Email Inactive",
        "Date of 2026 Initial Email": today,
      });
    }
  }

  console.log("\n🎉 Cold Outreach workflow complete.");
}

/** Workflow 2: Follow-Up Outreach (3+ days after initial, no reply, not yet followed up) */
/** Workflow 2: Follow-Up Outreach */
async function runFollowup() {
  console.log("📩 Starting Follow-Up workflow...");
  if (!isBusinessHours()) {
    console.log("⏸ Not within business hours, skipping.");
    return;
  }

  console.log("📡 Fetching leads needing follow-up from Airtable...");
  const leads = await getLeadsNeedingFollowup();
  console.log(`✅ Found ${leads.length} lead(s) for follow-up.`);

  if (leads.length === 0) {
    console.log("ℹ️ No leads to follow up with, exiting.");
    return;
  }

  const today = getIsoDate();

  for (const [index, lead] of leads.entries()) {
    console.log(`\n➡️ [${index + 1}/${leads.length}] Follow-up: ${lead.businessName} <${lead.email}>`);

    try {
      const emailResponse = await sendFollowUpEmail({
        to: lead.email,
        businessName: lead.businessName,
        leadName: lead.leadName,
        threadId: lead.threadId,
        subject: lead.originalSubject || `Helping ${lead.businessName} Get More Bookings`, // fallback
      });

      await updateRecord(lead.id, {
        "Cold Outreach Step": "2026 Follow-up Sent",
        "Replied 2026?": "No",
        "Ready for Follow-up 2026": true,
        "Follow-up Date 2026": today,
        "Email Count": 2
      });

      console.log(`✅ Follow-up sent to ${lead.businessName}`);
    } catch (err) {
      console.error(`❌ Error sending follow-up to ${lead.email}:`, err?.message || err);
      await updateRecord(lead.id, {
        "Follow-up Date 2026": "",
      });
    }
  }

  console.log("\n🎉 Follow-Up workflow complete.");
}

/** Workflow 3: Follow-Up2 Outreach */
async function run2ndFollowup() {
  console.log("📩 Starting 2nd Follow-Up workflow...");
  if (!isBusinessHours()) {
    console.log("⏸ Not within business hours, skipping.");
    return;
  }

  console.log("📡 Fetching leads needing 2nd follow-up from Airtable...");
  const leads = await getLeadsNeeding2ndFollowup();
  console.log(`✅ Found ${leads.length} lead(s) to check for 2nd follow-up.`);

  if (leads.length === 0) {
    console.log("ℹ️ No leads found, exiting.");
    return;
  }

  const today = getIsoDate();

  for (const [index, lead] of leads.entries()) {
    console.log(`\n➡️ [${index + 1}/${leads.length}] Checking: ${lead.businessName} <${lead.email}>`);

    try {
      // Only send 2nd follow-up if last follow-up was more than 3 days ago
      console.log("DEBUG followupdate field raw value:", lead.followupdate);

      if (lead.followupdate) {
        const followUpDate = new Date(lead.followupdate);
        const now = new Date(today);
        const diffDays = Math.floor((now - followUpDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 3 && lead.emailcount==2) {
          console.log(`📅 Last follow-up was ${diffDays} days ago → sending 2nd follow-up email...`);

          const emailResponse = await send2ndFollowUpEmail({
            to: lead.email,
            businessName: lead.businessName,
            leadName: lead.leadName,
            threadId: lead.threadId,
            subject: lead.originalSubject || `Fill more treatment slots`, // fallback
          });

          await updateRecord(lead.id, {
            "Replied 2026?": "No",
            "Follow-up Date 2026": today, // update with this latest send date
            "Email Count":3,
            "Cold Outreach Step":"2026 2nd Follow-up Sent",
          });

          console.log(`✅ 2nd follow-up sent to ${lead.businessName}`);
        } else {
          console.log(`⏭️ Last follow-up was only ${diffDays} days ago → skipping ${lead.businessName}`);
        }
      } else {
        console.log(`ℹ️ No "followupdate" found for ${lead.businessName}, skipping.`);
      }
    } catch (err) {
      console.error(`❌ Error sending 2nd follow-up to ${lead.email}:`, err?.message || err);
      await updateRecord(lead.id, {
        "Follow-up Date 2026": "",
      });
    }
  }

  console.log("\n🎉 2nd Follow-Up workflow complete.");
}




// Run one workflow at a time: `node main.js outreach` or `node main.js followup`
const mode = process.argv[2];
if (mode === "outreach") {
  runOutreach();
} else if (mode === "followup") {
  runFollowup();
  } else if (mode === "followup2") {
  run2ndFollowup();

} else {
  console.log("⚠️ Please specify a workflow: outreach or followup");
}

process.on("unhandledRejection", (reason) => {
  console.error("🚨 Unhandled Rejection:", reason);
});


