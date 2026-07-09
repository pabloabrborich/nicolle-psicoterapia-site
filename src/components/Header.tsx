"use client";

import Link from "next/link";
import { brand, navItems } from "@/data/site";
import { whatsappUrl } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";
import { ButtonLink } from "./ButtonLink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-linen/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-xl font-semibold text-ink">
          {brand.name}
        </Link>
        <nav aria-label="Navegacion principal" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-graphite hover:text-pine">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={whatsappUrl()} variant="secondary" className="hidden sm:inline-flex" onClick={() => trackSafeEvent("cta_click_whatsapp", { placement: "header" })}>
            WhatsApp
          </ButtonLink>
          <ButtonLink href="/agenda" onClick={() => trackSafeEvent("cta_click_agenda", { placement: "header" })}>
            Agendar
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
