"use server";

import { headers } from "next/headers";
import { sendEmail } from "@/lib/email";

export async function submitQuoteRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const eventId = formData.get("eventId") as string;

  // Update this in actions.ts
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  // Split by comma and take the first item, default to 127.0.0.1
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  // const ip = "164.68.240.80";
  const ua = headerList.get("user-agent") ?? "unknown";

  const result = await sendEmail(
    "New Lead - Angara Steamers",
    `New Lead Received:, Name: ${name}, Phone: ${phone}, Message: ${message}`,
    {
      eventName: "Lead",
      eventId,
      value: 0,
      user: {
        phone,
        firstName: name,
        clientIpAddress: ip,
        clientUserAgent: ua,
      },
    },
  );

  return result;
}
