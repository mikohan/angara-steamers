"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { submitQuoteRequest } from "@/app/api/email/actions";
import BeforeImage from "@/public/images/before-after-1.jpg";

export function CTA({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [phone, setPhone] = useState("");

  const searchParams = useSearchParams();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 6)
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    else if (value.length > 3)
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    else if (value.length > 0) value = `(${value}`;
    setPhone(value);
  };

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");

    // Generate the exact same eventId for Meta CAPI and browser event deduplication
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    formData.append("eventId", eventId);

    // Extract UTM parameters from URL query string
    const utmSource = searchParams.get("utm_source") || "direct";
    const utmMedium = searchParams.get("utm_medium") || "none";
    const utmCampaign = searchParams.get("utm_campaign") || "none";
    const utmContent = searchParams.get("utm_content") || "none";
    const utmTerm = searchParams.get("utm_term") || "none";

    // Append UTM parameters to FormData so the Server Action reads them cleanly
    formData.append("utmSource", utmSource);
    formData.append("utmMedium", utmMedium);
    formData.append("utmCampaign", utmCampaign);
    formData.append("utmContent", utmContent);
    formData.append("utmTerm", utmTerm);

    // Safely push to dataLayer without conflicting global declarations
    if (typeof window !== "undefined") {
      const win = window as unknown as { dataLayer: Record<string, unknown>[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: "form_submitted",
        event_id: eventId, // Matches your GTM 'dlv - event_id'
        estimated_value: 0, // Matches your GTM 'dlv - estimated_value'
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });
    }

    const result = await submitQuoteRequest(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("idle");
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <section
      className={cn("px-4 md:px-8 bg-primary/10 rounded-2xl p-8", className)}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 w-full min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                >
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-foreground"
                >
                  Your request sent!
                </motion.h3>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col gap-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  Service Guarantee: If a stain comes back, we come back and
                  reclean it free.
                </h2>
                <p className="text-xl text-muted">
                  We’ll make it look <strong>brand new again!</strong>
                </p>
                <form
                  action={handleSubmit}
                  className="flex flex-col gap-3 mt-4"
                >
                  <input
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <input
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(xxx) xxx-xxxx"
                    required
                    minLength={14}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <input
                    name="message"
                    required
                    placeholder="What do you need cleaned? (required)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {status === "loading"
                      ? "SENDING..."
                      : "GET A FREE QUOTE TODAY!"}
                  </button>
                </form>
                <div className="mt-4 text-xs text-muted text-center">
                  By submitting, you agree to our{" "}
                  <a href="/policy" className="underline hover:text-primary">
                    Privacy Policy
                  </a>{" "}
                  and consent to receive communication from Angara Streamers.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full flex-1">
          <div className="max-w-175 aspect-square rounded-xl overflow-hidden relative">
            <Image
              alt="Before"
              fill
              src={BeforeImage}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
