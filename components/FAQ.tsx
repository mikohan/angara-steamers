"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface SanityChild {
  _type: string;
  _key?: string;
  text: string;
  marks?: string[];
}

interface SanityBlock {
  _type: string;
  _key?: string;
  style?: string;
  text?: string;
  children?: SanityChild[];
}

interface FAQItem {
  question: string;
  answer: string | SanityBlock[];
}

interface LocationFAQProps {
  cityName?: string;
  items: FAQItem[];
  serviceName?: string;
}

function renderAnswer(answer: string | SanityBlock[]): string {
  if (typeof answer === "string") {
    return answer;
  }

  if (Array.isArray(answer)) {
    return answer
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join("");
        }
        if (block.text) return block.text;
        return "";
      })
      .join("\n");
  }

  return "";
}

export default function FAQ({
  cityName,
  items,
  serviceName,
}: LocationFAQProps) {
  if (!items?.length) return null;

  return (
    <>
      {/* Dynamic Native Grid Overlay */}
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left Column: Heading Layout */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="sticky top-28 space-y-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-primary backdrop-blur-sm">
                <HelpCircle className="h-4 w-4 stroke-[2.5]" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  Common Questions
                </span>
              </div>

              <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
                {serviceName
                  ? `${serviceName} `
                  : `Cleaning Services ${cityName ? "in " + cityName : ""} `}
                <span className="block bg-linear-to-r from-primary to-primary-800 bg-clip-text text-transparent">
                  What You Need to Know
                </span>
              </h2>

              <p className="max-w-md text-base leading-relaxed text-muted">
                Everything you should expect regarding our residential and
                premium commercial cleaning frameworks across the{" "}
                {cityName || "local"} region.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Themed Accordion */}
          <div className="lg:w-7/12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {items.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="group rounded-2xl border border-primary/20 bg-background px-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.04)] data-[state=open]:border-primary data-[state=open]:shadow-[0_12px_32px_-8px_rgba(var(--primary),0.08)]"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-primary hover:no-underline md:text-lg">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="pb-6 text-sm leading-relaxed text-muted whitespace-pre-line sm:text-base">
                      <div className="border-t border-primary/10 pt-4">
                        {renderAnswer(faq.answer)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
