import type { Metadata } from "next";
import { Section, SectionInner } from "@/components/Section";

export const metadata: Metadata = {
  title: "Disponibilidad",
  robots: { index: false, follow: false }
};

export default function DisponibilidadPage() {
  return (
    <Section className="min-h-screen bg-linen">
      <SectionInner className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Configuracion</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Disponibilidad</h1>
        <div className="mt-8 rounded-lg bg-white p-6 text-sm leading-7 text-graphite shadow-soft">
          <p>
            La primera version usa una capacidad base de seis horarios: 07:00, 08:00, 09:00, 17:00, 18:00 y 19:00. El website muestra solo 2 a 4 espacios sugeridos por dia para mantener una agenda curada y reservar margen operativo.
          </p>
          <p className="mt-4">
            El siguiente paso es convertir esta pantalla en un editor visual para bloquear dias, cambiar horarios y definir cupos diarios sin tocar codigo.
          </p>
        </div>
      </SectionInner>
    </Section>
  );
}
