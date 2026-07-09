"use client";

import { bookingUrl, env } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";
import { ButtonLink } from "./ButtonLink";

export function BookingEmbed() {
  const url = bookingUrl();

  if (!url) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <h2 className="font-serif text-3xl font-semibold text-ink">Agenda externa pendiente de configurar</h2>
        <p className="mt-3 text-sm leading-6 text-graphite">Configura Acuity, Calendly, HubSpot Meetings o un enlace externo en variables de entorno. Mientras tanto, el flujo recomienda WhatsApp.</p>
        <ButtonLink href="/agenda#whatsapp" className="mt-5">Ver alternativas</ButtonLink>
      </div>
    );
  }

  const canEmbed = env.bookingProvider === "acuity" || env.bookingProvider === "hubspot";

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
      {canEmbed ? (
        <iframe src={url} title="Agenda online" className="h-[720px] w-full rounded-lg border-0" onLoad={() => trackSafeEvent("booking_view", { provider: env.bookingProvider })} />
      ) : (
        <div className="p-6">
          <h2 className="font-serif text-3xl font-semibold text-ink">Agenda disponible en enlace externo</h2>
          <p className="mt-3 text-sm leading-6 text-graphite">Abre la agenda para elegir el horario que mejor se ajuste a tu semana.</p>
          <ButtonLink href={url} className="mt-5" onClick={() => trackSafeEvent("booking_click", { provider: env.bookingProvider })}>Abrir agenda</ButtonLink>
        </div>
      )}
    </div>
  );
}
