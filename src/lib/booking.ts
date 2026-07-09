export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type BookingService =
  | "Videollamada inicial sin costo – 15 minutos"
  | "Sesión Inicial"
  | "Sesión de Seguimiento"
  | "Pack mensual 4 sesiones"
  | "Taller o Grupo";

export type Booking = {
  id: string;
  service: BookingService;
  startsAt: string;
  endsAt: string;
  name: string;
  email: string;
  whatsapp: string;
  consultationReason: string;
  status: BookingStatus;
  createdAt: string;
};

export type PublicBooking = Pick<Booking, "id" | "service" | "startsAt" | "endsAt" | "status">;

export const bookingServices: BookingService[] = [
  "Videollamada inicial sin costo – 15 minutos",
  "Sesión Inicial",
  "Sesión de Seguimiento",
  "Taller o Grupo"
];

export const sessionMinutes = 50;
export const briefOrientationMinutes = 15;
export const ecuadorOffset = "-05:00";
export const baseDailyTimes = ["07:00", "08:00", "09:00", "17:00", "18:00", "19:00"];
export const suggestedSlotPatterns = [
  ["07:00", "17:00"],
  ["08:00", "18:00", "19:00"],
  ["09:00", "17:00", "18:00"],
  ["07:00", "08:00", "19:00"],
  ["08:00", "17:00"],
  ["07:00", "09:00", "18:00", "19:00"]
];

export function bookingDurationMinutes(service: BookingService) {
  return service === "Videollamada inicial sin costo – 15 minutos" ? briefOrientationMinutes : sessionMinutes;
}

export function dateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Guayaquil",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function displayDate(date: Date | string) {
  return new Intl.DateTimeFormat("es-EC", {
    timeZone: "America/Guayaquil",
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date(date));
}

export function displayTime(date: Date | string) {
  return new Intl.DateTimeFormat("es-EC", {
    timeZone: "America/Guayaquil",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

export function icsHref(booking: Pick<Booking, "service" | "startsAt" | "endsAt">) {
  const format = (value: string) => value.replaceAll("-", "").replaceAll(":", "").replace(".000", "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${booking.service} - Psic. Nicolle De la Torre, Mgs.`,
    `DTSTART:${format(booking.startsAt)}`,
    `DTEND:${format(booking.endsAt)}`,
    "DESCRIPTION:Sesion online. Recibiras confirmacion por WhatsApp o email.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");

  return `data:text/calendar;charset=utf8,${encodeURIComponent(body)}`;
}

export function generateAvailability(daysAhead = 21) {
  const days: Array<{ key: string; label: string; slots: string[] }> = [];
  const now = new Date();

  for (let index = 0; index < daysAhead; index += 1) {
    const day = new Date(now);
    day.setDate(now.getDate() + index);
    const key = dateKey(day);
    const weekday = new Date(`${key}T12:00:00${ecuadorOffset}`).getUTCDay();
    if (weekday === 0) continue;

    const suggestedTimes = suggestedSlotPatterns[days.length % suggestedSlotPatterns.length];

    days.push({
      key,
      label: displayDate(`${key}T12:00:00${ecuadorOffset}`),
      slots: suggestedTimes.map((time) => new Date(`${key}T${time}:00${ecuadorOffset}`).toISOString())
    });
  }

  return days;
}

export function validateBookingInput(input: Partial<Booking>) {
  const errors: Record<string, string> = {};
  if (!input.service || !bookingServices.includes(input.service)) errors.service = "Elige un tipo de sesion.";
  if (!input.startsAt || Number.isNaN(new Date(input.startsAt).getTime())) errors.startsAt = "Elige un horario.";
  if (!input.name || input.name.trim().length < 2) errors.name = "Escribe tu nombre.";
  if (!input.whatsapp || input.whatsapp.trim().length < 7) errors.whatsapp = "Escribe un WhatsApp valido.";
  if (!input.email || !/.+@.+\..+/.test(input.email)) errors.email = "Escribe un email valido.";
  if (input.consultationReason && input.consultationReason.trim().length > 700) errors.consultationReason = "Usa un resumen breve de hasta 700 caracteres.";
  return errors;
}
