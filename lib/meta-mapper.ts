import { createHash } from "crypto";
import { MetaEventParams, MetaPayload } from "@/types";

const hashData = (data: string): string =>
  createHash("sha256").update(data.toLowerCase().trim()).digest("hex");

export const createMetaPayload = (meta: MetaEventParams): MetaPayload => {
  const payload: MetaPayload = {
    data: [
      {
        event_name: meta.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: meta.eventId,
        action_source: meta.actionSource ?? "website",
        user_data: {
          ph: hashData(meta.user.phone),
          fn: hashData(meta.user.firstName),
          client_ip_address: meta.user.clientIpAddress,
          client_user_agent: meta.user.clientUserAgent,
          ...(meta.user.fbp && { fbp: meta.user.fbp }),
          ...(meta.user.fbc && { fbc: meta.user.fbc }),
          ...(meta.user.email && { em: hashData(meta.user.email) }),
        },
        custom_data: {
          value: meta.value ?? 180,
          currency: meta.currency ?? "USD",
          content_name: meta.contentName ?? "Quote Request",
        },
      },
    ],
  };

  if (process.env.FB_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.FB_TEST_EVENT_CODE;
  }

  return payload;
};
