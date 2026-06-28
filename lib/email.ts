import { Resend } from "resend";
import { MetaEventParams } from "@/types";
import { createMetaPayload } from "./meta-mapper";
import { DEBUG_CONFIG } from "./config";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendMyEmail(
  subject: string,
  html: string,
  meta?: MetaEventParams,
  to: string = process.env.NEXT_PUBLIC_COMPANY_MANAGER_EMAIL ||
    "angaralabllc@gmail.com",
  from: string = process.env.RESEND_FROM_EMAIL || "info@angaracleaning.com",
) {
  console.log("ENGINEERING: [3a/4] sendMyEmail started");

  try {
    // 1. Prepare Email Task
    const emailPromise = DEBUG_CONFIG.SEND_EMAIL
      ? resend.emails.send({ from, to, subject, html })
      : Promise.resolve({ data: { id: "DEBUG_SKIP" }, error: null });

    // 2. Prepare Meta Task

    console.log("ENGINEERING: Checking Meta conditions:", {
      hasMeta: !!meta,
      hasPixelId: !!process.env.META_PIXEL_ID,
      pixelIdValue: process.env.META_PIXEL_ID, // See what it actually contains
    });

    const metaPromise =
      meta && process.env.META_PIXEL_ID
        ? sendMetaEvent(meta)
        : Promise.resolve();

    // 3. AWAIT BOTH
    const [emailResult, metaResult] = await Promise.all([
      emailPromise,
      metaPromise,
    ]);

    if (emailResult.error) {
      console.error("Resend API Error:", emailResult.error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("sendMyEmail Exception:", error);
    return { success: false };
  }
}

async function sendMetaEvent(meta: MetaEventParams) {
  console.log("DEBUG PAYLOAD", meta);
  try {
    const payload = createMetaPayload(meta);
    const url = `https://graph.facebook.com/v20.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result; // Ensure this returns so Promise.all can track it
  } catch (error) {
    console.error("ENGINEERING: [Meta-Task] Exception:", error);
  }
}
