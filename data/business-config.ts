import { formatPhoneForSchema } from "@/lib/dataCleaner";
export const BUSINESS_CONFIG = {
  business_name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Angara Steamers",
  slogan: "Premium Carpet, Couch & Upholstery Cleaning",
  siteName: "Angara Steamers The best Carpet & Upholstery Cleaners",
  founder: "Vladimir Vostrikov",
  founding_date: "2022-4-07",
  founding_location: "Los Angeles, CA",
  phone:
    formatPhoneForSchema(process.env.NEXT_PUBLIC_COMPANY_PHONE || "") ||
    "(213)-598-7763",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@angaracleaning.com",
  same_as: [
    process.env.NEXT_PUBLIC_COMPANY_IG ||
      "https://www.instagram.com/angara_steamers",
    process.env.NEXT_PUBLIC_COMPANY_FB ||
      "https://www.facebook.com/angara_steamers",
    process.env.NEXT_PUBLIC_COMPANY_GMB ||
      "https://share.google/t8Hz0LTlyNlNw1pqO",
  ],
  opening_hours: [
    { dayOfWeek: "Tuesday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Wednesday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Thursday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Friday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Sunday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Monday", opens: "08:00", closes: "20:00" },
  ],
  knowsAbout: [
    "Restoration of stained or worn upholstery",
    "Removal of pet odors and organic stains",
    "High-heat truck-mounted extraction",
    "Rapid-dry textile restoration",
    "Deep-fiber allergen and dust mite extraction",
    "Safe cleaning for luxury and performance fabrics",
    "Residential mattress sanitization",
    "Elimination of deep-set household allergens",
    "Professional fabric fiber maintenance",
    "Sanitization of heavily used home furniture",
  ],
  rating: "4.9",
  review_count: "597",
  priceRange: "$$",
};
