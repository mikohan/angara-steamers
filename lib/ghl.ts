// lib/ghl.ts
// Sends website quote requests into GoHighLevel: upserts the contact and
// opens a card in the "Angara Steamers Leads" pipeline at the New Lead stage.
// Runs alongside the email + Meta CAPI send. It never throws: a GHL failure is
// logged and the form result stays decided by the email send, as before.

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

// GHL custom field IDs (Angara Steamers sub-account)
const FIELD = {
  utmSource: "1vwl8pOMfifTlh0hDTxw",
  utmMedium: "O9T49qKEewbEbX0DQBZ8",
  utmCampaign: "sr3ucIiYdvEmqXsKvrtg",
  utmContent: "7uT6pk2TttWLOUfPuE2l",
  utmTerm: "S5ANqUubUyESfpkTQ4jn",
  fbClickId: "qGIU5EArw3RWePWtiWXf", // _fbc
  fbBrowserId: "nMDKHHV0CjMU3m05SJ81", // _fbp
  leadEventId: "xphDfFwZoNPMJvolRqcd", // same event_id as the Meta Lead
} as const;

export interface GhlLead {
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  eventId: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
  fbc?: string;
  fbp?: string;
}

function ghlHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// "(213) 555-1234" -> "+12135551234"
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

export async function sendLeadToGhl(lead: GhlLead): Promise<void> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_STAGE_NEW_LEAD;

  if (!token || !locationId || !pipelineId || !stageId) {
    console.warn("GHL: env vars missing, lead not sent to GHL");
    return;
  }

  try {
    const headers = ghlHeaders(token);

    const customFields = [
      { id: FIELD.utmSource, field_value: lead.utm.source },
      { id: FIELD.utmMedium, field_value: lead.utm.medium },
      { id: FIELD.utmCampaign, field_value: lead.utm.campaign },
      { id: FIELD.utmContent, field_value: lead.utm.content },
      { id: FIELD.utmTerm, field_value: lead.utm.term },
      { id: FIELD.leadEventId, field_value: lead.eventId },
      ...(lead.fbc ? [{ id: FIELD.fbClickId, field_value: lead.fbc }] : []),
      ...(lead.fbp ? [{ id: FIELD.fbBrowserId, field_value: lead.fbp }] : []),
    ];

    // 1. Create or update the contact (GHL matches existing contacts by phone)
    const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: toE164(lead.phone),
        source: "Website quote form",
        tags: ["website lead"],
        customFields,
      }),
    });
    const upsert = await upsertRes.json();
    const contactId: string | undefined = upsert?.contact?.id;
    if (!upsertRes.ok || !contactId) {
      console.error("GHL: contact upsert failed", upsertRes.status, upsert);
      return;
    }

    // 2. Add the request text as a note on the contact
    if (lead.message.trim()) {
      await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: `Website quote request: ${lead.message}` }),
      }).catch((e) => console.error("GHL: note failed", e));
    }

    // 3. Open a New Lead card, unless this contact already has an open card
    const searchUrl =
      `${GHL_API}/opportunities/search?location_id=${locationId}` +
      `&pipeline_id=${pipelineId}&contact_id=${contactId}&status=open`;
    const searchRes = await fetch(searchUrl, { headers });
    const search = await searchRes.json();
    if (searchRes.ok && search?.opportunities?.length > 0) return;

    const name = `${lead.firstName} ${lead.lastName}`.trim() || lead.phone;
    const oppRes = await fetch(`${GHL_API}/opportunities/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        pipelineId,
        pipelineStageId: stageId,
        contactId,
        name: `${name} - website`,
        status: "open",
        monetaryValue: 0,
        source: "Website quote form",
      }),
    });
    if (!oppRes.ok) {
      console.error("GHL: opportunity create failed", oppRes.status, await oppRes.text());
    }
  } catch (error) {
    console.error("GHL: exception", error);
  }
}
