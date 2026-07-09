import { Section, SectionInner } from "@/components/Section";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata("Privacidad", "Politica de privacidad del sitio.", "/privacidad");

export default function PrivacidadPage() {
  return (
    <Section className="bg-white">
      <SectionInner className="max-w-3xl">
        <h1 className="font-serif text-5xl font-semibold text-ink">Privacidad</h1>
        <div className="mt-8 space-y-5 text-sm leading-7 text-graphite">
          <p>Este sitio recoge datos basicos de contacto para responder solicitudes de agenda, WhatsApp o interes en talleres.</p>
          <p>No solicitamos informacion clinica sensible, diagnosticos ni detalles profundos en formularios iniciales.</p>
          <p>La analitica usa eventos genericos y no envia nombres, mensajes libres ni informacion de salud mental a plataformas de medicion.</p>
          <p>Si configuras HubSpot, webhooks, GA4, Meta Pixel o proveedores de agenda, revisa sus politicas y activa consentimiento cuando corresponda.</p>
        </div>
      </SectionInner>
    </Section>
  );
}
