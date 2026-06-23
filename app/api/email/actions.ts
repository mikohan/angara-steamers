"use server";
import { sendEmail } from "@/lib/email";

export async function submitQuoteRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  // Simple server-side validation
  if (!name || !phone) return { success: false, error: "Missing fields" };

  await sendEmail(
    undefined,
    "New Quote Request",
    `<p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p>`,
  );
  return { success: true };
}
