"use client";

import Link from "next/link";
import { faqs, services, trustItems, workshops } from "@/data/site";
import { whatsappUrl } from "@/lib/env";
import { trackSafeEvent } from "@/lib/analytics";
import { ButtonLink } from "./ButtonLink";
import { Section, SectionInner } from "./Section";

export function TrustSection() {
  return (
    <div className="border-y border-ink/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-5 sm:px-6 lg:px-8">
        {trustItems.map((item) => (
          <span key={item} className="rounded-full bg-mint px-4 py-2 text-sm font-medium text-ink">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WhoIHelpSection() {
  const items = ["Adultos", "Familias y crianza", "Emocional infantil", "Talleres", "Grupos", "Arte terapia"];
  return (
    <Section className="bg-white">
      <SectionInner>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">En que puedo acompanarte</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Rutas de apoyo pensadas para decidir con calma.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item} className="rounded-lg border border-ink/10 bg-linen p-6">
              <h3 className="text-xl font-semibold text-ink">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">Explora si este tipo de acompanamiento puede responder a tu momento actual sin compartir informacion sensible en el primer contacto.</p>
            </div>
          ))}
        </div>
      </SectionInner>
    </Section>
  );
}

export function ApproachSection() {
  return (
    <Section className="bg-mint">
      <SectionInner className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Como trabajo</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Enfoque humano, claro y basado en evidencia.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-lg bg-white p-6 shadow-soft">
            <h3 className="text-xl font-semibold">ACT</h3>
            <p className="mt-3 text-sm leading-6 text-graphite">La Terapia de Aceptacion y Compromiso ayuda a mirar pensamientos y emociones con mas flexibilidad, conectando acciones con valores importantes.</p>
          </article>
          <article className="rounded-lg bg-white p-6 shadow-soft">
            <h3 className="text-xl font-semibold">CBT</h3>
            <p className="mt-3 text-sm leading-6 text-graphite">La Terapia Cognitivo Conductual permite reconocer patrones, practicar herramientas concretas y construir cambios observables en la vida diaria.</p>
          </article>
        </div>
      </SectionInner>
    </Section>
  );
}

export function ServicesDecisionSection() {
  return (
    <Section className="bg-linen">
      <SectionInner>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Elige tu siguiente paso</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Tres caminos simples para avanzar.</h2>
          </div>
          <ButtonLink href="#router" variant="secondary">Usar mini guia</ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">{service.text}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-pine">Ver ruta</span>
            </Link>
          ))}
        </div>
      </SectionInner>
    </Section>
  );
}

export function BookingSection() {
  return (
    <Section className="bg-white">
      <SectionInner className="rounded-lg bg-ink p-8 text-white md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">Centro de agenda</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">Agenda una primera sesion o consulta por WhatsApp.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">La disponibilidad esta pensada para 3 a 4 nuevas sesiones por dia. Si no encuentras un horario, WhatsApp es el mejor camino para revisar opciones.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ButtonLink href="/agenda" variant="light" onClick={() => trackSafeEvent("cta_click_agenda", { placement: "booking_section" })}>Agendar</ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="secondary" onClick={() => trackSafeEvent("cta_click_whatsapp", { placement: "booking_section" })}>WhatsApp</ButtonLink>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}

export function WorkshopsSection() {
  return (
    <Section className="bg-mint">
      <SectionInner>
        <h2 className="font-serif text-4xl font-semibold text-ink">Talleres y grupos</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {workshops.map((item) => (
            <article key={item.title} className="rounded-lg bg-white p-6 shadow-soft">
              <span className="rounded-full bg-oat px-3 py-1 text-xs font-semibold text-ink">{item.status}</span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">{item.text}</p>
            </article>
          ))}
        </div>
      </SectionInner>
    </Section>
  );
}

export function FAQSection() {
  return (
    <Section className="bg-white">
      <SectionInner className="grid gap-8 lg:grid-cols-[0.65fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Preguntas frecuentes</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Respuestas para decidir con mas claridad.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-lg border border-ink/10 bg-linen p-5">
              <summary className="cursor-pointer text-base font-semibold text-ink">{faq.q}</summary>
              <p className="mt-3 text-sm leading-6 text-graphite">{faq.a}</p>
            </details>
          ))}
        </div>
      </SectionInner>
    </Section>
  );
}
