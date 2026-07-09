import type { Metadata } from "next";
import { AdminAgenda } from "@/components/AdminAgenda";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Agenda privada",
  robots: { index: false, follow: false }
};

export default function AdminAgendaPage() {
  return (
    <Section className="min-h-screen bg-linen">
      <AdminAgenda />
    </Section>
  );
}
