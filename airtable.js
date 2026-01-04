import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();

console.log("🔑 Initializing Airtable connection...");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const table = base(process.env.AIRTABLE_TABLE_NAME);

/**
 * Initial outreach candidates
 */
export async function getPendingLeads() {
  console.log("📡 Fetching pending leads (initial outreach)...");
  try {
    const filter = "AND({Ready for Email 2026} = TRUE(), OR({Email Sent 2026} = '', {Email Sent 2026} = 'No'))";
    console.log("🔍 Initial Outreach filter:", filter);

    const records = await table
      .select({
        filterByFormula: filter,
        maxRecords: 50,
      })
      .all();

    console.log(`✅ Found ${records.length} pending lead(s).`);

    return records.map((record) => {
      const data = {
        id: record.id,
        email: record.get("Email"),
        businessName: record.get("Business Name"),
        leadName: record.get("Lead Name"),
        readyForInitialEmail: record.get("Ready for Email 2026"),
        initialEmailSent: record.get("Email Sent 2026"),
        dateOfInitialOutreach: record.get("Date of 2026 Initial Email"),
        replied: record.get("Replied 2026?"),
        threadId: record.get("Thread ID"),
        emailcount: record.get("Email Count"),
      };
      console.log("➡️ Lead (initial):", data);
      return data;
    });
  } catch (err) {
    console.error("❌ Error fetching initial leads:", err);
    throw err;
  }
}

/**
 * Step 1: Find leads to mark ready
 */
export async function getLeadsToMarkReady() {
  console.log("📡 Fetching leads to mark ready for follow-up...");
  try {
    const formula = `
    AND(
      {Email Sent 2026} = 'Yes',
      {Replied 2026?} != 'Yes',
      {Ready for Follow-up 2026} != TRUE(),
      DATETIME_DIFF(
        TODAY(),
        {Date of 2026 Initial Email},
        'days'
      ) >= 3
    )`.trim();

    console.log("🔍 Mark Ready filter:", formula);

    const records = await table
      .select({
        filterByFormula: formula,
        maxRecords: 50,
      })
      .all();

    console.log(`✅ Found ${records.length} lead(s) to mark as ready.`);
    records.forEach((r) =>
      console.log("➡️ Candidate to mark ready:", {
        id: r.id,
        email: r.get("Email"),
        initialEmailSent: r.get("Email Sent 2026"),
        replied: r.get("Replied 2026?"),
        readyForFollowup: r.get("Ready for Follow-up 2026"),
        dateOfInitialOutreach: r.get("Date of 2026 Initial Email"),
      })
    );

    return records.map((record) => ({
      id: record.id,
      email: record.get("Email"),
      businessName: record.get("Business Name"),
      leadName: record.get("Lead Name"),
      dateOfInitialOutreach: record.get("Date of 2026 Initial Email"),
      replied: record.get("Replied 2026?"),
    }));
  } catch (err) {
    console.error("❌ Error fetching leads to mark ready:", err);
    throw err;
  }
}

/**
 * Step 2: Fetch leads that need follow-up
 */
export async function getLeadsNeedingFollowup() {
  console.log("📡 Fetching leads needing follow-up...");
  try {
    const formula = `
    AND(
      {Email Sent 2026} = 'Yes',
      {Replied 2026?} != 'Yes',
      {Ready for Follow-up 2026} = FALSE(),
      DATETIME_DIFF(
        TODAY(),
        {Date of 2026 Initial Email},
        'days'
      ) >= 3
    )`.trim();

    console.log("🔍 Follow-up filter:", formula);

    const records = await table
      .select({
        filterByFormula: formula,
        maxRecords: 50,
      })
      .all();

    console.log(`✅ Found ${records.length} follow-up lead(s).`);
    records.forEach((r) =>
      console.log("➡️ Candidate for follow-up:", {
        id: r.id,
        email: r.get("Email"),
        initialEmailSent: r.get("Email Sent 2026"),
        replied: r.get("Replied 2026?"),
        readyForFollowup: r.get("Ready for Follow-up 2026"),
        dateOfInitialOutreach: r.get("Date of 2026 Initial Email"),
      })
    );

    return records.map((record) => {
      const data = {
        id: record.id,
        email: record.get("Email"),
        businessName: record.get("Business Name"),
        leadName: record.get("Lead Name"),
        initialEmailSent: record.get("Email Sent 2026"),
        dateOfInitialOutreach: record.get("Date of 2026 Initial Email"),
        replied: record.get("Replied 2026?"),
        readyForFollowup: record.get("Ready for Follow-up 2026"),
        threadId: record.get("Thread ID"),
      };
      return data;
    });
  } catch (err) {
    console.error("❌ Error fetching follow-up leads:", err);
    throw err;
  }
}

/**
 * Step 3: Fetch leads eligible for 2nd (3rd) Follow-Up
 */
export async function getLeadsNeeding2ndFollowup() {
  console.log("📡 Fetching leads needing 2nd follow-up...");
  try {
    const formula = `
      AND(
        {Email Sent 2026} = 'Yes',
        {Replied 2026?} != 'Yes',
        OR({Cold Outreach Step} = '2026 Follow-up Sent',{Cold Outreach Step} = '2026 2nd Follow-up Sent'),
        DATETIME_DIFF(
          TODAY(),
          {Follow-up Date 2026},
          'days'
        ) >= 3
      )
    `.trim();

    console.log("🔍 2nd Follow-up filter:", formula);

    const records = await table
      .select({
        filterByFormula: formula,
        maxRecords: 50,
      })
      .all();

    console.log(`✅ Found ${records.length} lead(s) for 2nd follow-up.`);
    return records.map((record) => ({
      id: record.id,
      email: record.get("Email"),
      businessName: record.get("Business Name"),
      leadName: record.get("Lead Name"),
      threadId: record.get("Thread ID"),
      followupdate: record.get("Follow-up Date 2026"),
      coldOutreachStep: record.get("Cold Outreach Step"),
      emailcount: record.get("Email Count"),
    }));
  } catch (err) {
    console.error("❌ Error fetching 2nd follow-up leads:", err);
    throw err;
  }
}


/**
 * Utility: Update record in Airtable
 */
export async function updateRecord(id, updates) {
  console.log(`📝 Updating record ${id} with:`, updates);
  try {
    const result = await table.update([{ id, fields: updates }]);
    console.log(`✅ Successfully updated record ${id}`);
    return result;
  } catch (err) {
    console.error(`❌ Error updating record ${id}:`, err);
    throw err;
  }
}
