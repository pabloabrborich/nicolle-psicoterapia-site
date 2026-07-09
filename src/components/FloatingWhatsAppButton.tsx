"use client";

import { whatsappUrl } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      aria-label="Hablar por WhatsApp"
      onClick={() => trackSafeEvent("cta_click_whatsapp", { placement: "floating" })}
      className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-pine text-lg font-bold text-white shadow-soft transition hover:bg-ink md:flex"
    >
      WA
    </a>
  );
}
