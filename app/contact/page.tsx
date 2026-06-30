"use client";
import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { submitQuoteRequest } from "@/app/api/email/actions";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

const sanitizeInput = (str: string) => {
  return str.replace(/[<>]/g, "");
};

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [phone, setPhone] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    formData.append("eventId", eventId);

    // Track in GTM
    const win = window as Record<string, unknown>;
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: "form_submitted",
        event_id: eventId,
        estimated_value: 0,
      });
    }

    // Track in Meta Pixel
    // if (typeof win.fbq === "function") {
    //   (win.fbq as (...args: unknown[]) => void)("track", "Lead", {
    //     eventID: eventId,
    //   });
    // }

    const result = await submitQuoteRequest(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("idle");
      alert("Submission failed. Please check your information and try again.");
    }
  };

  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "Contacts", path: "/contact" },
  ];

  return (
    <div className="mx-auto max-w-7xl py-16 px-4 md:px-0">
      <Breadcrumbs segments={breadcrumbSegments} />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Let&apos;s Refresh Your Space
          </h1>
          <p className="text-lg text-muted">
            Have questions about our upholstery cleaning process? We&apos;re
            here to help you get that fresh-home feeling back.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-primary font-semibold">Email:</span>
              <span>{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-semibold">Service Area:</span>
              <span>Serving the greater area</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 p-8 rounded-3xl border border-primary/30 min-h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
              </motion.div>
            ) : (
              <motion.form
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="w-full space-y-5"
              >
                <input
                  name="name"
                  placeholder="Your Name"
                  required
                  maxLength={50}
                  onChange={(e) =>
                    (e.target.value = sanitizeInput(e.target.value))
                  }
                  className="w-full p-4 rounded-xl border border-primary/30 bg-background focus:ring-2 focus:ring-primary outline-none transition"
                />
                <input
                  name="phone"
                  placeholder="(xxx) xxx-xxxx"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  minLength={14}
                  className="w-full p-4 rounded-xl border border-primary/30 bg-background focus:ring-2 focus:ring-primary outline-none transition"
                />
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  maxLength={500}
                  onChange={(e) =>
                    (e.target.value = sanitizeInput(e.target.value))
                  }
                  className="w-full p-4 rounded-xl border border-primary/30 bg-background focus:ring-2 focus:ring-primary outline-none transition"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "SENDING..." : "Send Message"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
