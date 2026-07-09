export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593992717772",
  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ||
    "Hola Psic. Nicolle, quisiera conocer si este espacio puede ser un buen fit para mi.",
  bookingProvider: process.env.NEXT_PUBLIC_BOOKING_PROVIDER || "external",
  acuityEmbedUrl: process.env.NEXT_PUBLIC_ACUITY_EMBED_URL || "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  hubspotMeetingsUrl: process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL || "",
  externalBookingUrl: process.env.NEXT_PUBLIC_EXTERNAL_BOOKING_URL || "",
  hubspotPortalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "",
  hubspotFormId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  consentMode: process.env.NEXT_PUBLIC_ENABLE_CONSENT_MODE !== "false",
  paymentsProvider: process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER || "external",
  payphoneLink: process.env.NEXT_PUBLIC_PAYPHONE_LINK || "",
  kushkiLink: process.env.NEXT_PUBLIC_KUSHKI_LINK || "",
  datafastLink: process.env.NEXT_PUBLIC_DATAFAST_LINK || "",
  blogEnabled: process.env.NEXT_PUBLIC_BLOG_ENABLED !== "false"
};

export function whatsappUrl(message = env.whatsappMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${env.whatsappNumber}?text=${text}`;
}

export function bookingUrl() {
  if (env.bookingProvider === "acuity") return env.acuityEmbedUrl;
  if (env.bookingProvider === "calendly") return env.calendlyUrl;
  if (env.bookingProvider === "hubspot") return env.hubspotMeetingsUrl;
  return env.externalBookingUrl;
}

export function paymentUrl() {
  if (env.paymentsProvider === "payphone") return env.payphoneLink;
  if (env.paymentsProvider === "kushki") return env.kushkiLink;
  if (env.paymentsProvider === "datafast") return env.datafastLink;
  return "";
}
