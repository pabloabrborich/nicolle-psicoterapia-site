"use client";

import Link from "next/link";
import { whatsappUrl } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-linen p-3 md:hidden">
      <Link href="/agenda" onClick={() => trackSafeEvent("cta_click_agenda", { placement: "mobile_sticky" })} className="rounded-full bg-pine px-4 py-3 text-center text-sm font-semibold text-white">
        Agendar
      </Link>
      <a href={whatsappUrl()} onClick={() => trackSafeEvent("cta_click_whatsapp", { placement: "mobile_sticky" })} className="rounded-full border border-steel bg-white px-4 py-3 text-center text-sm font-semibold text-pine">
        WhatsApp
      </a>
    </div>
  );
}
