import { HeroSection } from "@/components/HeroSection";
import { MiniFitRouterForm } from "@/components/MiniFitRouterForm";
import { ApproachSection, BookingSection, FAQSection, ServicesDecisionSection, TrustSection, WhoIHelpSection, WorkshopsSection } from "@/components/HomeSections";
import { Section, SectionInner } from "@/components/Section";
import { FAQSchema, PersonSchema } from "@/components/Schema";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata(
  "Psicoterapia online en Ecuador",
  "Agenda psicoterapia online con Psic. Nicolle De la Torre, Mgs. para adultos, familias, crianza, talleres y arte terapia."
);

export default function Home() {
  return (
    <>
      <PersonSchema />
      <FAQSchema />
      <HeroSection />
      <TrustSection />
      <WhoIHelpSection />
      <ApproachSection />
      <ServicesDecisionSection />
      <Section className="bg-linen">
        <SectionInner className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Mini guia</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Encuentra el siguiente paso sin dar demasiados detalles.</h2>
            <p className="mt-4 text-sm leading-6 text-graphite">Este formulario solo recoge datos de contacto y preferencias generales para orientar la respuesta inicial.</p>
          </div>
          <MiniFitRouterForm />
        </SectionInner>
      </Section>
      <BookingSection />
      <WorkshopsSection />
      <FAQSection />
    </>
  );
}
