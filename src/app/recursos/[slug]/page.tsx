import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { Section, SectionInner } from "@/components/Section";
import { resources, pageMetadata } from "@/data/site";
import { whatsappUrl } from "@/lib/env";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) return {};
  return pageMetadata(resource.title, resource.excerpt, `/recursos/${resource.slug}`);
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();

  return (
    <>
      <section className="bg-linen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">{resource.category}</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-ink">{resource.title}</h1>
          <p className="mt-5 text-lg leading-8 text-graphite">{resource.excerpt}</p>
        </div>
      </section>
      <Section className="bg-white">
        <SectionInner className="max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <p>Este recurso ofrece una mirada inicial y educativa. No busca diagnosticar ni reemplazar una evaluacion profesional.</p>
            <p>Una forma util de empezar es observar que situaciones activan mayor tension, que respuestas aparecen de manera automatica y que pequena accion podria acercarte a un valor importante.</p>
            <p>En terapia, estas preguntas se trabajan con contexto, ritmo y herramientas ajustadas a cada persona o familia.</p>
          </article>
          <div className="mt-10 rounded-lg bg-mint p-6">
            <h2 className="font-serif text-3xl font-semibold text-ink">Siguiente paso</h2>
            <p className="mt-3 text-sm leading-6 text-graphite">Puedes agendar una sesion, escribir por WhatsApp o revisar talleres si prefieres un espacio grupal.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/agenda">Agendar</ButtonLink>
              <ButtonLink href={whatsappUrl()} variant="secondary">WhatsApp</ButtonLink>
              <ButtonLink href="/talleres-y-grupos" variant="ghost">Ver talleres</ButtonLink>
            </div>
          </div>
        </SectionInner>
      </Section>
    </>
  );
}
