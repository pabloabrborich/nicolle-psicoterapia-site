import { PageHero } from "@/components/PageHero";
import { BookingSection, FAQSection } from "@/components/HomeSections";
import { Section, SectionInner } from "@/components/Section";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata(
  "Terapia individual online para adultos",
  "Acompanamiento psicoterapeutico online para adultos en Ecuador con enfoques ACT y CBT.",
  "/adultos"
);

export default function AdultosPage() {
  const topics = ["Estres y ansiedad cotidiana", "Cambios vitales", "Regulacion emocional", "Relaciones", "Habitos", "Sentido y valores"];
  return (
    <>
      <PageHero
        eyebrow="Terapia individual"
        title="Un proceso online para entender tu momento y construir pasos sostenibles."
        text="Si estas atravesando estres, cambios emocionales, decisiones importantes o dificultades en tus relaciones, este espacio puede ayudarte a ordenar lo que pasa y practicar respuestas mas alineadas con tus valores."
      />
      <Section className="bg-white">
        <SectionInner>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <div key={topic} className="rounded-lg bg-linen p-6">
                <h2 className="text-lg font-semibold text-ink">{topic}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite">Trabajo gradual, con herramientas concretas y espacio para comprender tu contexto sin juicios.</p>
              </div>
            ))}
          </div>
        </SectionInner>
      </Section>
      <Section className="bg-mint">
        <SectionInner className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="font-serif text-3xl font-semibold text-ink">ACT en la practica</h2>
            <p className="mt-3 text-sm leading-6 text-graphite">Exploramos como relacionarte de otra manera con pensamientos y emociones, mientras eliges acciones conectadas con lo que valoras.</p>
          </article>
          <article className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="font-serif text-3xl font-semibold text-ink">CBT en la practica</h2>
            <p className="mt-3 text-sm leading-6 text-graphite">Identificamos patrones, creencias y conductas que pueden ajustarse con herramientas claras y seguimiento.</p>
          </article>
        </SectionInner>
      </Section>
      <BookingSection />
      <FAQSection />
    </>
  );
}
