import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your constant as the default value here
export async function sendEmail(
  to: string = process.env.NEXT_PUBLIC_COMPANY_MANAGER_EMAIL ||
    "angaralabllc@gmail.com",
  subject: string,
  html: string,
  from: string = process.env.RESEND_FROM_EMAIL || "info@angaracleaning.com",
) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
