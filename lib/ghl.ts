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

export interface GhlPaidOrder {
  name: string;
  email: string;
  phone: string;
  items: { description: string; quantity: number; amount: number }[]; // amount in $
  total: number; // $ paid
  stripeSessionId: string;
}

// Paid online order from the website cart (Stripe checkout). Upserts the
// contact, adds the order as a note, and puts the paid total on the card's
// value. The card goes to New Lead: the job still needs a date, and moving it
// to Booked/Done stays a manual step (that is what sends Schedule/Purchase to
// Meta). Never throws.
export async function sendPaidOrderToGhl(order: GhlPaidOrder): Promise<void> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_STAGE_NEW_LEAD;

  if (!token || !locationId || !pipelineId || !stageId) {
    console.warn("GHL: env vars missing, paid order not sent to GHL");
    return;
  }
  if (!order.email && !order.phone) {
    console.warn("GHL: paid order has no email or phone, not sent");
    return;
  }

  try {
    const headers = ghlHeaders(token);
    const [firstName, ...rest] = order.name.trim().split(/\s+/);

    const upsertRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName: firstName || undefined,
        lastName: rest.join(" ") || undefined,
        ...(order.email ? { email: order.email } : {}),
        ...(order.phone ? { phone: toE164(order.phone) } : {}),
        source: "Website cart (paid)",
        tags: ["website lead", "paid online"],
      }),
    });
    const upsert = await upsertRes.json();
    const contactId: string | undefined = upsert?.contact?.id;
    if (!upsertRes.ok || !contactId) {
      console.error("GHL: paid order contact upsert failed", upsertRes.status, upsert);
      return;
    }

    const lines = order.items
      .map((i) => `- ${i.description} x${i.quantity}: $${i.amount.toFixed(0)}`)
      .join("\n");
    await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        body: `PAID ONLINE $${order.total.toFixed(0)} (Stripe ${order.stripeSessionId})\n${lines}\nNeeds a date: call to schedule.`,
      }),
    }).catch((e) => console.error("GHL: paid order note failed", e));

    // Open card for this contact? Put the paid total on it. Otherwise open one.
    const searchUrl =
      `${GHL_API}/opportunities/search?location_id=${locationId}` +
      `&pipeline_id=${pipelineId}&contact_id=${contactId}&status=open`;
    const searchRes = await fetch(searchUrl, { headers });
    const search = await searchRes.json();
    const existing = searchRes.ok ? search?.opportunities?.[0] : undefined;

    if (existing?.id) {
      const updRes = await fetch(`${GHL_API}/opportunities/${existing.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ monetaryValue: order.total }),
      });
      if (!updRes.ok) {
        console.error("GHL: paid order value update failed", updRes.status, await updRes.text());
      }
      return;
    }

    const label = order.name.trim() || order.email || order.phone;
    const oppRes = await fetch(`${GHL_API}/opportunities/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        pipelineId,
        pipelineStageId: stageId,
        contactId,
        name: `${label} - paid online`,
        status: "open",
        monetaryValue: order.total,
        source: "Website cart (paid)",
      }),
    });
    if (!oppRes.ok) {
      console.error("GHL: paid order opportunity create failed", oppRes.status, await oppRes.text());
    }
  } catch (error) {
    console.error("GHL: paid order exception", error);
  }
}
