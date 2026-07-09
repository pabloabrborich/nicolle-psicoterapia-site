import { ButtonLink } from "./ButtonLink";
import { whatsappUrl } from "@/lib/env";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-linen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight text-ink">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/agenda">Agendar una cita</ButtonLink>
          <ButtonLink href={whatsappUrl()} variant="secondary">Hablar por WhatsApp</ButtonLink>
        </div>
      </div>
    </section>
  );
}
