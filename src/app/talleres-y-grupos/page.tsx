import { MiniFitRouterForm } from "@/components/MiniFitRouterForm";
import { PageHero } from "@/components/PageHero";
import { WorkshopsSection } from "@/components/HomeSections";
import { Section, SectionInner } from "@/components/Section";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata(
  "Talleres, grupos y arte terapia",
  "Talleres online, grupos y arte terapia con Psic. Nicolle De la Torre, Mgs.",
  "/talleres-y-grupos"
);

export default function TalleresPage() {
  return (
    <>
      <PageHero
        eyebrow="Talleres y grupos"
        title="Canales grupales para aprender, practicar y sostener recursos."
        text="Talleres online, grupos de acompanamiento y arte terapia como experiencias de aprendizaje, adquisicion y cuidado continuo."
      />
      <WorkshopsSection />
      <Section className="bg-linen">
        <SectionInner className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Interes</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Deja tus datos para recibir la proxima convocatoria.</h2>
            <p className="mt-4 text-sm leading-6 text-graphite">El formulario registra interes general y evita solicitar informacion clinica sensible.</p>
          </div>
          <MiniFitRouterForm />
        </SectionInner>
      </Section>
    </>
  );
}
