"use client";
import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { submitQuoteRequest } from "@/api/email/actions";

export function QuoteDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

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

    // Generate unique ID
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    formData.append("eventId", eventId);

    // Browser Tracking
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_submitted", event_id: eventId });
    }

    // Submit to Server
    const result = await submitQuoteRequest(formData);

    if (result.success) {
      setStatus("success");
      // Auto-close after 3 seconds
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        setName("");
        setPhone("");
      }, 3000);
    } else {
      setStatus("idle");
      alert("Failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* DialogContent uses theme-aware variables from global.css */}
      <DialogContent className="sm:max-w-md bg-background border border-primary/20 p-8 shadow-2xl rounded-2xl">
        {status === "success" ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-primary">Request Sent!</h3>
            <p className="text-muted mt-2">We will be in touch shortly.</p>
          </div>
        ) : (
          <form action={handleSubmit} className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Get a Quote for Upholstery or Carpets Cleaning
              </h2>
              <p className="text-muted mt-1 text-sm">
                Fill out your details below. I will contact you ASAP.
              </p>
            </div>

            <input
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 focus:ring-2 focus:ring-primary outline-none transition-all text-foreground"
            />
            <input
              name="phone"
              placeholder="(000) 000-0000"
              value={phone}
              onChange={handlePhoneChange}
              required
              minLength={14}
              className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 focus:ring-2 focus:ring-primary outline-none transition-all text-foreground"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-800 transition-colors disabled:opacity-50 touch-feedback"
            >
              {status === "loading" ? "SENDING..." : "GET FREE QUOTE"}
            </button>
          </form>
        )}
        <div className="mt-4 text-xs text-muted text-center">
          By submitting, you agree to our{" "}
          <a href="/policy" className="underline hover:text-primary">
            Privacy Policy
          </a>{" "}
          and consent to receive communication from Angara Streamers.
        </div>
      </DialogContent>
    </Dialog>
  );
}
