import { Section, SectionInner } from "@/components/Section";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata("Terminos", "Terminos de uso del sitio.", "/terminos");

export default function TerminosPage() {
  return (
    <Section className="bg-white">
      <SectionInner className="max-w-3xl">
        <h1 className="font-serif text-5xl font-semibold text-ink">Terminos</h1>
        <div className="mt-8 space-y-5 text-sm leading-7 text-graphite">
          <p>La informacion del sitio tiene fines educativos y de coordinacion de servicios psicoterapeuticos online.</p>
          <p>El uso del sitio no constituye atencion de emergencia ni reemplaza una consulta profesional personalizada.</p>
          <p>Si existe riesgo inminente, crisis o emergencia, busca ayuda inmediata a traves de ECU 911 o la linea 171 del MSP.</p>
          <p>Los horarios, precios, talleres y packs pueden actualizarse segun disponibilidad y configuracion de proveedores externos.</p>
        </div>
      </SectionInner>
    </Section>
  );
}
