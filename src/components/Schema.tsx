import Script from "next/script";
import { brand, faqs } from "@/data/site";
import { env } from "@/lib/env";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    name: brand.name,
    jobTitle: "Psicologa clinica y psicoterapeuta",
    areaServed: "Ecuador",
    url: env.siteUrl,
    priceRange: "$$",
    serviceType: "Psicoterapia online"
  };

  return <Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a }
    }))
  };

  return <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
