import type { Metadata } from "next";
import { env } from "@/lib/env";

export const brand = {
  name: "Psic. Nicolle De la Torre, Mgs.",
  title: "Psicologa clinica y psicoterapeuta online en Ecuador",
  price: "USD 40",
  location: "Ecuador"
};

export const navItems = [
  { href: "/adultos", label: "Adultos" },
  { href: "/familias-crianza", label: "Familias" },
  { href: "/talleres-y-grupos", label: "Talleres" },
  { href: "/recursos", label: "Recursos" }
];

export const trustItems = [
  "Psicologa",
  "Psicoterapeuta",
  "Magister en Psicologia Clinica",
  "Online",
  "Adultos, familias y talleres"
];

export const services = [
  {
    title: "Terapia individual para adultos",
    text: "Un espacio online para trabajar regulacion emocional, estres, cambios vitales, relaciones, habitos, sentido y valores.",
    href: "/adultos"
  },
  {
    title: "Familias y crianza",
    text: "Acompanamiento a madres, padres y cuidadores para ordenar retos familiares con claridad y cuidado.",
    href: "/familias-crianza"
  },
  {
    title: "Talleres, grupos y arte terapia",
    text: "Experiencias grupales online para aprender herramientas, compartir procesos y sostener nuevos habitos.",
    href: "/talleres-y-grupos"
  }
];

export const faqs = [
  {
    q: "Como se si este espacio es adecuado para mi?",
    a: "Puedes agendar una primera sesion o escribir por WhatsApp para revisar si el formato online, el enfoque y el tipo de acompanamiento encajan con lo que buscas."
  },
  {
    q: "Las sesiones son online?",
    a: "Si. El servicio esta pensado para sesiones online con adultos, familias y cuidadores en Ecuador o personas ecuatorianas fuera del pais."
  },
  {
    q: "Cuanto cuesta una sesion individual?",
    a: "La sesion individual tiene un precio base de USD 40. Tambien se puede consultar por packs mensuales de cuatro sesiones."
  },
  {
    q: "Que informacion debo compartir al iniciar?",
    a: "El primer contacto pide solo datos basicos para coordinar. No necesitas compartir detalles sensibles en formularios iniciales."
  }
];

export const workshops = [
  {
    title: "Regulacion emocional en la vida diaria",
    status: "Lista de espera",
    text: "Herramientas practicas para identificar emociones, responder con mas claridad y sostener cambios pequenos."
  },
  {
    title: "Crianza, vinculo y limites",
    status: "Proximamente",
    text: "Un taller para madres, padres y cuidadores que buscan acompanar con firmeza, calma y presencia."
  },
  {
    title: "Arte terapia para procesos emocionales",
    status: "Inscripciones abiertas",
    text: "Encuentros online para explorar recursos expresivos sin exigencia artistica previa."
  }
];

export const resources = [
  {
    slug: "regular-emociones-sin-exigirte",
    title: "Regular emociones sin exigirte estar bien todo el tiempo",
    category: "regulacion emocional",
    excerpt: "Ideas iniciales para reconocer lo que sientes y responder con mas cuidado en dias complejos."
  },
  {
    slug: "act-cbt-en-palabras-simples",
    title: "ACT y CBT en palabras simples",
    category: "ACT / CBT",
    excerpt: "Una guia breve para entender como estos enfoques pueden ayudar a ordenar pensamientos, valores y acciones."
  },
  {
    slug: "crianza-con-mas-claridad",
    title: "Crianza con mas claridad en momentos de cambio",
    category: "crianza",
    excerpt: "Preguntas utiles para familias que quieren acompanar emociones infantiles sin perder estructura."
  }
];

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${env.siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name,
      locale: "es_EC",
      type: "website"
    }
  };
}
