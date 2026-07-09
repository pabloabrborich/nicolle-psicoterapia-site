"use client";

import { ButtonLink } from "./ButtonLink";
import { whatsappUrl } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linen px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Psicoterapia online en Ecuador</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            Un espacio claro y humano para ordenar lo que estas atravesando.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
            Acompanamiento psicoterapeutico para adultos, familias y cuidadores desde enfoques ACT y CBT, con sesiones online, talleres y procesos grupales.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/agenda" onClick={() => trackSafeEvent("cta_click_agenda", { placement: "hero" })}>
              Agendar una cita
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="secondary" onClick={() => trackSafeEvent("cta_click_whatsapp", { placement: "hero" })}>
              Hablar por WhatsApp
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-sage p-6 shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,#ffffff_0,#ffffff00_36%),linear-gradient(140deg,#DCE8ED,#F8FAF9_55%,#B9796233)]" />
          <div className="relative flex h-full flex-col justify-between rounded-lg border border-white/70 bg-white/65 p-6 backdrop-blur">
            <div>
              <p className="text-sm font-semibold text-pine">Primer contacto</p>
              <p className="mt-3 font-serif text-4xl text-ink">Un primer encuentro para saber si este espacio es para ti</p>
              <p className="mt-4 text-sm leading-6 text-graphite">
                Conversamos brevemente sobre tu motivo de consulta de forma general, resolvemos dudas iniciales y revisamos si el acompanamiento terapeutico puede responder a lo que necesitas ahora.
              </p>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-ink">
              <span className="rounded-full bg-white px-4 py-3">Online</span>
              <span className="rounded-full bg-white px-4 py-3">No necesitas compartir detalles sensibles</span>
              <ButtonLink href="/agenda" variant="primary" onClick={() => trackSafeEvent("cta_click_agenda", { placement: "hero_card_orientation" })}>
                Agendar videollamada
              </ButtonLink>
              <p className="text-xs font-semibold text-graphite">15 minutos - Sin costo - Online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
