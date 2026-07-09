import { ResourceCard } from "@/components/ResourceCard";
import { PageHero } from "@/components/PageHero";
import { Section, SectionInner } from "@/components/Section";
import { resources, pageMetadata } from "@/data/site";

export const metadata = pageMetadata(
  "Recursos de psicoterapia, crianza y regulacion emocional",
  "Articulos breves para adultos, familias, crianza, ACT, CBT y talleres.",
  "/recursos"
);

export default function RecursosPage() {
  return (
    <>
      <PageHero
        eyebrow="Recursos"
        title="Lecturas breves para comprender, no para etiquetarte."
        text="Contenido educativo sobre regulacion emocional, crianza, familias y enfoques terapeuticos, con lenguaje claro y aplicable."
      />
      <Section className="bg-white">
        <SectionInner>
          <div className="grid gap-4 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.slug} {...resource} />
            ))}
          </div>
        </SectionInner>
      </Section>
    </>
  );
}
