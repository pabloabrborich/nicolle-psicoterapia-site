"use client";

export type SafeEventName =
  | "cta_click_agenda"
  | "cta_click_whatsapp"
  | "router_started"
  | "router_completed"
  | "booking_view"
  | "booking_click"
  | "workshop_interest_submit"
  | "blog_cta_click";

type SafeParams = Record<string, string | number | boolean | undefined>;

const allowedKeys = new Set(["placement", "destination", "step", "provider", "content_type"]);

export function trackSafeEvent(name: SafeEventName, params: SafeParams = {}) {
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => allowedKeys.has(key))
  );

  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("safe-analytics", { detail: { name, params: safeParams } }));

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) gtag("event", name, safeParams);

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (fbq) fbq("trackCustom", name, safeParams);
}
