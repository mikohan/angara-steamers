"use client";
import { useState, useCallback } from "react";
import { submitQuoteRequest } from "@/app/api/email/actions";

export function useLeadTracking() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // useCallback ensures this function instance is stable
  const submitLead = useCallback(
    async (formData: FormData) => {
      // Prevent re-submission if already loading
      if (status === "loading") return;

      setStatus("loading");

      const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      formData.append("eventId", eventId);

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form_submitted", event_id: eventId });

        if (window.fbq) {
          window.fbq(
            "track",
            "Lead",
            {
              value: 180,
              currency: "USD",
              content_name: "Quote Request",
            },
            { eventID: eventId },
          );
        }
      }

      const result = await submitQuoteRequest(formData);

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert("Submission failed. Please try again.");
      }
    },
    [status],
  ); // Only re-run if status changes

  return { submitLead, status };
}
