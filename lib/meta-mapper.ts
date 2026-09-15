import { createHash } from "crypto";
import { MetaEventParams, MetaPayload, MetaPayloadEvent } from "@/types";

const hashData = (data: string): string =>
  createHash("sha256").update(data.toLowerCase().trim()).digest("hex");

export const createMetaPayload = (meta: MetaEventParams): MetaPayload => {
  const userData: MetaPayloadEvent["user_data"] = {
    ph: hashData(meta.user.phone || ""),
    fn: hashData(meta.user.firstName || ""),
    ln: hashData(meta.user.lastName || ""),
    client_ip_address: meta.user.clientIpAddress || "",
    client_user_agent: meta.user.clientUserAgent || "",
  };

  if (meta.user.email) {
    userData.em = hashData(meta.user.email);
  }
  if (meta.user.fbc) {
    userData.fbc = meta.user.fbc;
  }
  if (meta.user.fbp) {
    userData.fbp = meta.user.fbp;
  }

  const payload: MetaPayload = {
    data: [
      {
        event_name: meta.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: meta.eventId,
        action_source: meta.actionSource ?? "website",
        user_data: userData,
        custom_data: {
          value: meta.value ?? 0,
          currency: meta.currency ?? "USD",
          ...(meta.contentName && { content_name: meta.contentName }),
        },
      },
    ],
  };

  if (process.env.FB_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.FB_TEST_EVENT_CODE;
  }

  return payload;
};
