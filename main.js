import { getPendingLeads, getLeadsNeedingFollowup, getLeadsNeedingTempFollowup, updateRecord } from "./airtable.js";
import { sendInitialEmail, sendFollowUpEmail,sendTempFollowUpEmail } from "./email.js";

function isBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const hour = now.getHours();
  return day >= 1 && day <= 6 && hour >= 7 && hour < 28; // Mon-Sat, 07:00–18:00
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
        "Cold Outreach Step": "Initial Electronic Msg Sent",
        "Date of Initial Outreach": today,
        "Thread ID": emailResponse.messageId || "(no messageId)",
        "Initial Email Sent": "Yes",
      });

      console.log(`✅ Initial sent to ${lead.businessName}`);
    } catch (err) {
      console.error(`❌ Error sending initial to ${lead.email}:`, err?.message || err);
      console.error("🔎 Full error dump:", JSON.stringify(err, null, 2));
      await updateRecord(lead.id, {
        "Initial Email Sent": "Email Inactive",
        "Date of Initial Outreach": today,
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
        "Cold Outreach Step": "Follow-up Sent",
        "Replied?": "No",
        "Ready For Follow-up Email": true,
        "Follow-Up Date": today,
      });

      console.log(`✅ Follow-up sent to ${lead.businessName}`);
    } catch (err) {
      console.error(`❌ Error sending follow-up to ${lead.email}:`, err?.message || err);
      await updateRecord(lead.id, {
        "Follow-Up Date": "",
      });
    }
  }

  console.log("\n🎉 Follow-Up workflow complete.");
}

/** Workflow 3: Follow-Up2 Outreach */
//TEMP to send the new email
async function runTempFollowup() {
  console.log("📩 Starting Temp Follow-Up workflow...");
  if (!isBusinessHours()) {
    console.log("⏸ Not within business hours, skipping.");
    return;
  }

  console.log("📡 Fetching leads needing temp follow-up from Airtable...");
  const leads = await getLeadsNeedingTempFollowup();
  console.log(`✅ Found ${leads.length} lead(s) to check for temp follow-up.`);

  if (leads.length === 0) {
    console.log("ℹ️ No leads found, exiting.");
    return;
  }

  const today = getIsoDate();

  for (const [index, lead] of leads.entries()) {
    console.log(`\n➡️ [${index + 1}/${leads.length}] Checking: ${lead.businessName} <${lead.email}>`);

    try {
      // Only send temp follow-up if last follow-up was more than 10 days ago
      console.log("DEBUG followupdate field raw value:", lead.followupdate);

      if (lead.followupdate) {
        const followUpDate = new Date(lead.followupdate);
        const now = new Date(today);
        const diffDays = Math.floor((now - followUpDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 10) {
          console.log(`📅 Last follow-up was ${diffDays} days ago → sending TEMP follow-up email...`);

          const emailResponse = await sendTempFollowUpEmail({
            to: lead.email,
            businessName: lead.businessName,
            leadName: lead.leadName,
            threadId: lead.threadId,
            subject: lead.originalSubject || `Fill more treatment slots`, // fallback
          });

          await updateRecord(lead.id, {
            "Replied?": "No",
            "Follow-Up Date": today, // update with this latest send date
          });

          console.log(`✅ Temp follow-up sent to ${lead.businessName}`);
        } else {
          console.log(`⏭️ Last follow-up was only ${diffDays} days ago → skipping ${lead.businessName}`);
        }
      } else {
        console.log(`ℹ️ No "followupdate" found for ${lead.businessName}, skipping.`);
      }
    } catch (err) {
      console.error(`❌ Error sending temp follow-up to ${lead.email}:`, err?.message || err);
      await updateRecord(lead.id, {
        "Follow-Up Date": "",
      });
    }
  }

  console.log("\n🎉 Temp Follow-Up workflow complete.");
}




// Run one workflow at a time: `node main.js outreach` or `node main.js followup`
const mode = process.argv[2];
if (mode === "outreach") {
  runOutreach();
} else if (mode === "followup") {
  runFollowup();
  } else if (mode === "followup2") {
  runTempFollowup();

} else {
  console.log("⚠️ Please specify a workflow: outreach or followup");
}

process.on("unhandledRejection", (reason) => {
  console.error("🚨 Unhandled Rejection:", reason);
});


