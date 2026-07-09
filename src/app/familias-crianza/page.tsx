import { PageHero } from "@/components/PageHero";
import { BookingSection, FAQSection } from "@/components/HomeSections";
import { Section, SectionInner } from "@/components/Section";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata(
  "Familias, crianza y acompanamiento emocional infantil",
  "Acompanamiento online para familias, cuidadores y retos de crianza en Ecuador.",
  "/familias-crianza"
);

export default function FamiliasPage() {
  const items = ["Vinculo y comunicacion", "Limites y rutinas", "Manejo emocional", "Retos familiares", "Acompanamiento a cuidadores", "Orientacion en temas infantiles"];
  return (
    <>
      <PageHero
        eyebrow="Familias y crianza"
        title="Acompanamiento para cuidar el vinculo sin perder estructura."
        text="Un espacio para madres, padres y cuidadores que buscan mirar los retos familiares con mas calma, claridad y herramientas aplicables en casa."
      />
      <Section className="bg-white">
        <SectionInner>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item} className="rounded-lg border border-ink/10 bg-linen p-6">
                <h2 className="text-lg font-semibold text-ink">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite">Miramos el contexto familiar, el momento de desarrollo y las necesidades de cuidado para elegir pasos posibles.</p>
              </article>
            ))}
          </div>
        </SectionInner>
      </Section>
      <BookingSection />
      <FAQSection />
    </>
  );
}
