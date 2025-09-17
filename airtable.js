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
    const filter = "AND({Ready For Initial Email} = TRUE(), OR({Initial Email Sent} = '', {Initial Email Sent} = 'No'))";
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
        readyForInitialEmail: record.get("Ready For Initial Email"),
        initialEmailSent: record.get("Initial Email Sent"),
        dateOfInitialOutreach: record.get("Date of Initial Outreach"),
        replied: record.get("Replied?"),
        threadId: record.get("Thread ID"),
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
      {Initial Email Sent} = 'Yes',
      {Replied?} != 'Yes',
      {Ready For Follow-up Email} != TRUE(),
      DATETIME_DIFF(
        TODAY(),
        {Date of Initial Outreach},
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
        initialEmailSent: r.get("Initial Email Sent"),
        replied: r.get("Replied?"),
        readyForFollowup: r.get("Ready For Follow-up Email"),
        dateOfInitialOutreach: r.get("Date of Initial Outreach"),
      })
    );

    return records.map((record) => ({
      id: record.id,
      email: record.get("Email"),
      businessName: record.get("Business Name"),
      leadName: record.get("Lead Name"),
      dateOfInitialOutreach: record.get("Date of Initial Outreach"),
      replied: record.get("Replied?"),
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
      {Initial Email Sent} = 'Yes',
      {Replied?} != 'Yes',
      {Ready For Follow-up Email} = FALSE(),
      DATETIME_DIFF(
        TODAY(),
        {Date of Initial Outreach},
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
        initialEmailSent: r.get("Initial Email Sent"),
        replied: r.get("Replied?"),
        readyForFollowup: r.get("Ready For Follow-up Email"),
        dateOfInitialOutreach: r.get("Date of Initial Outreach"),
      })
    );

    return records.map((record) => {
      const data = {
        id: record.id,
        email: record.get("Email"),
        businessName: record.get("Business Name"),
        leadName: record.get("Lead Name"),
        initialEmailSent: record.get("Initial Email Sent"),
        dateOfInitialOutreach: record.get("Date of Initial Outreach"),
        replied: record.get("Replied?"),
        readyForFollowup: record.get("Ready For Follow-up Email"),
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
 * Step 3: Fetch leads eligible for Temp (3rd) Follow-Up
 */
export async function getLeadsNeedingTempFollowup() {
  console.log("📡 Fetching leads needing TEMP follow-up...");
  try {
    const formula = `
      AND(
        {Initial Email Sent} = 'Yes',
        {Replied?} != 'Yes',
        OR({Cold Outreach Step} = 'Follow-up Sent', {Cold Outreach Step} = 'Temp Follow-up Sent'),
        DATETIME_DIFF(
          TODAY(),
          {Follow-Up Date},
          'days'
        ) >= 10
      )
    `.trim();

    console.log("🔍 TEMP Follow-up filter:", formula);

    const records = await table
      .select({
        filterByFormula: formula,
        maxRecords: 50,
      })
      .all();

    console.log(`✅ Found ${records.length} lead(s) for TEMP follow-up.`);
    return records.map((record) => ({
      id: record.id,
      email: record.get("Email"),
      businessName: record.get("Business Name"),
      leadName: record.get("Lead Name"),
      threadId: record.get("Thread ID"),
      followupdate: record.get("Follow-Up Date"),
      coldOutreachStep: record.get("Cold Outreach Step"),
    }));
  } catch (err) {
    console.error("❌ Error fetching TEMP follow-up leads:", err);
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
