import Link from "next/link";

export function ResourceCard({ title, category, excerpt, slug }: { title: string; category: string; excerpt: string; slug: string }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">{category}</p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-graphite">{excerpt}</p>
      <Link href={`/recursos/${slug}`} className="mt-5 inline-flex text-sm font-semibold text-pine">
        Leer recurso
      </Link>
    </article>
  );
}
