import { OwnedBookingCalendar } from "@/components/OwnedBookingCalendar";
import { PageHero } from "@/components/PageHero";
import { PaymentPlans } from "@/components/PaymentPlans";
import { Section, SectionInner } from "@/components/Section";
import { ButtonLink } from "@/components/ButtonLink";
import { whatsappUrl } from "@/lib/env";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata(
  "Agenda psicoterapia online",
  "Centro de agenda para sesiones individuales, seguimiento, packs mensuales y talleres online.",
  "/agenda"
);

export default function AgendaPage() {
  const cards = ["Videollamada inicial sin costo – 15 minutos", "Sesión Inicial", "Sesión de Seguimiento", "Taller o Grupo"];
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Elige el formato que mejor se ajuste a tu siguiente paso."
        text="Puedes reservar una sesion, revisar un pack mensual o escribir por WhatsApp si necesitas confirmar disponibilidad antes de decidir."
      />
      <Section className="bg-white">
        <SectionInner>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((card) => (
              <div key={card} className="rounded-lg bg-linen p-5">
                <h2 className="text-base font-semibold text-ink">{card}</h2>
              </div>
            ))}
          </div>
        </SectionInner>
      </Section>
      <Section className="bg-mint">
        <SectionInner>
          <OwnedBookingCalendar />
        </SectionInner>
      </Section>
      <Section className="bg-white">
        <SectionInner>
          <h2 className="font-serif text-4xl font-semibold text-ink">Opciones de pago</h2>
          <div className="mt-8">
            <PaymentPlans />
          </div>
        </SectionInner>
      </Section>
      <Section className="bg-ink" >
        <SectionInner id="whatsapp" className="text-white">
          <h2 className="font-serif text-4xl font-semibold">Prefieres resolver una duda breve?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">WhatsApp funciona como alternativa si necesitas revisar disponibilidad antes de reservar o prefieres resolver una duda breve.</p>
          <ButtonLink href={whatsappUrl()} variant="light" className="mt-6">Hablar por WhatsApp</ButtonLink>
        </SectionInner>
      </Section>
    </>
  );
}
