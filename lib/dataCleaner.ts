// Add this helper to clean the phone number for Schema
export const formatPhoneForSchema = (phone?: string) => {
  // Removes everything except + and digits
  if (phone) return "+1" + phone.replace(/[^\d+]/g, "");
};
