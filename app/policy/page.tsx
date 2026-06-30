import Image from "next/image";
import MainImage from "@/public/vasya_rug.webp";
import {
  Phone,
  Mail,
  ShieldCheck,
  Lock,
  FileText,
  UserCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

export default function PrivacyPolicy() {
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE;
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL;

  const highlights = [
    { label: "No Data Sharing", icon: <ShieldCheck className="size-5" /> },
    { label: "No Cookies/Tracking", icon: <Lock className="size-5" /> },
    { label: "CCPA/CPRA Compliant", icon: <FileText className="size-5" /> },
    { label: "Secure Local Storage", icon: <Lock className="size-5" /> },
  ];
  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "Policy", path: "/policy" },
  ];
  return (
    <main className="min-h-screen bg-background py-16 px-6 lg:py-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs className="mb-8" segments={breadcrumbSegments} />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column: Personal Touch */}
        <aside className="space-y-8">
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
            <Image
              src={MainImage}
              alt="Owner of Angara Streamers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-primary-800/80 to-transparent">
              <p className="text-2xl font-bold text-white leading-tight">
                Dedicated to Your Trust
              </p>
              <p className="text-white/90 mt-2 font-medium">
                Angara Streamers Upholstery Cleaning
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <UserCircle className="text-primary" /> Our Commitment
            </h3>
            <div className="flex flex-col gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-muted bg-background/50 px-4 py-3 rounded-xl border border-primary/5"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Editorial Content */}
        <article className="bg-background border border-primary/10 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
              Your Privacy Matters.
            </h1>
            <p className="text-xl text-muted">
              How we handle your data with respect and transparency.
            </p>
          </header>

          <div className="text-foreground space-y-10 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-3 text-primary">
                What We Collect
              </h2>
              <p>
                As a specialized upholstery cleaning service in Los Angeles, we
                keep data collection minimal. We only request your{" "}
                <strong>Name</strong>, <strong>Email Address</strong>, and{" "}
                <strong>Phone Number</strong> to coordinate your cleaning
                sessions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3 text-primary">
                How Your Data is Used
              </h2>
              <p>
                Your information is used strictly for communication and
                scheduling. We use it to send you booking confirmations and
                necessary service updates via email or text. Your data resides
                solely in our secure, private, local database.
              </p>
            </section>

            <section className="bg-primary text-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Strict Privacy Policy</h2>
              <p className="text-white/90">
                <strong>
                  We do not sell, rent, or share your personal information with
                  third parties under any circumstances.
                </strong>{" "}
                We believe your trust is the most important part of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3 text-primary">
                Cookies & Tracking
              </h2>
              <p>
                Our website is designed for privacy. We do not use tracking
                cookies. Any analytical tools are for internal performance
                monitoring only—never for third-party advertising or profiling.
              </p>
            </section>
          </div>

          <footer className="mt-16 pt-10 border-t border-primary/10 grid md:grid-cols-2 gap-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors text-foreground"
            >
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail className="size-6" />
              </div>
              <span className="font-semibold">{email || "Email Pending"}</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors text-foreground"
            >
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone className="size-6" />
              </div>
              <span className="font-semibold">{phone || "Phone Pending"}</span>
            </a>
          </footer>
        </article>
      </div>
    </main>
  );
}
