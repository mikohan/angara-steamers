"use server";

import { headers } from "next/headers";
import { sendEmail } from "@/lib/email";
import { MetaEventParams } from "@/types";

export async function submitQuoteRequest(
  formData: FormData,
): Promise<{ success: boolean }> {
  const rawName = (formData.get("name") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const message = (formData.get("message") as string) || "";
  const eventId = (formData.get("eventId") as string) || "";

  // Split full name into first and last name to match browser advanced matching
  const nameParts = rawName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Extract UTM tracking attributes
  const utmSource = (formData.get("utmSource") as string) || "direct";
  const utmMedium = (formData.get("utmMedium") as string) || "none";
  const utmCampaign = (formData.get("utmCampaign") as string) || "none";
  const utmContent = (formData.get("utmContent") as string) || "none";
  const utmTerm = (formData.get("utmTerm") as string) || "none";

  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const ua = headerList.get("user-agent") ?? "unknown";

  // Meta CAPI payload parameters with both firstName and lastName
  const metaParams: MetaEventParams = {
    eventName: "Lead",
    eventId,
    value: 0,
    user: {
      phone,
      firstName,
      lastName,
      clientIpAddress: ip,
      clientUserAgent: ua,
    },
  };

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2563eb;">🔥 New Lead - Angara Steamers</h2>
      <p><strong>Name:</strong> ${rawName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message / Needed Cleaning:</strong> ${message}</p>
      <hr style="border:0; border-top:1px solid #eee; margin:20px 0;" />
      <h3 style="font-size: 14px; color: #666;">Campaign Attribution (UTM):</h3>
      <ul style="font-size: 13px; color: #555; padding-left: 20px;">
        <li><strong>Source:</strong> ${utmSource}</li>
        <li><strong>Medium:</strong> ${utmMedium}</li>
        <li><strong>Campaign:</strong> ${utmCampaign}</li>
        <li><strong>Content:</strong> ${utmContent}</li>
        <li><strong>Term:</strong> ${utmTerm}</li>
      </ul>
    </div>
  `;

  const result = await sendEmail(
    `New Lead: ${rawName} (${utmSource})`,
    emailHtml,
    metaParams,
  );

  return result;
}
