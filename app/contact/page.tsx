"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Heading & Info */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Let&apos;s Refresh Your Space
          </h1>
          <p className="text-lg text-muted">
            Have questions about our upholstery cleaning process? We’re here to
            help you get that fresh-home feeling back.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-primary font-semibold">Email:</span>
              <span>hello@angarastreamers.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-semibold">Service Area:</span>
              <span>Serving the greater area</span>
            </div>
          </div>
        </div>

        {/* Right: Modern Form */}
        <div className="bg-primary/10 p-8 rounded-3xl border border-primary/30">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              placeholder="Your Name"
              className="w-full p-4 rounded-xl border border-primary/30 bg-background focus:ring-2 focus:ring-primary outline-none transition"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-xl border border-primary/30 bg-background focus:ring-2 focus:ring-primary outline-none transition"
              required
            />
            <textarea
              placeholder="How can we help you?"
              rows={4}
              className="w-full p-4 rounded-xl border border-primary/30 bg-background focus:ring-2 focus:ring-primary outline-none transition"
              required
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {status === "success" ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
