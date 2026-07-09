"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { bookingServices, displayTime, generateAvailability, icsHref, validateBookingInput, type Booking, type BookingService, type PublicBooking } from "@/lib/booking";
import { trackSafeEvent } from "@/lib/analytics";

type FormState = {
  service: BookingService;
  startsAt: string;
  name: string;
  whatsapp: string;
  email: string;
  consultationReason: string;
};

const initialForm: FormState = {
  service: "Videollamada inicial sin costo – 15 minutos",
  startsAt: "",
  name: "",
  whatsapp: "",
  email: "",
  consultationReason: ""
};

export function OwnedBookingCalendar() {
  const [booked, setBooked] = useState<PublicBooking[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const days = useMemo(() => generateAvailability(21), []);

  useEffect(() => {
    const first = days[0]?.key || "";
    setSelectedDay(first);
  }, [days]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data: { bookings: PublicBooking[] }) => setBooked(data.bookings || []))
      .catch(() => setBooked([]));
  }, []);

  const selectedSlots = days.find((day) => day.key === selectedDay)?.slots || [];
  const bookedStarts = new Set(booked.map((booking) => booking.startsAt));
  const dayIsFull = selectedSlots.length > 0 && selectedSlots.every((slot) => bookedStarts.has(slot));

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validation = validateBookingInput(form);

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setLoading(false);

    if (response.status === 409) {
      setErrors({ startsAt: "Este horario acaba de ser tomado. Elige otro." });
      return;
    }

    if (!response.ok) {
      setErrors({ form: "No pudimos guardar la reserva. Intenta por WhatsApp." });
      return;
    }

    const data = (await response.json()) as { booking: Booking };
    setConfirmed(data.booking);
    setBooked((current) => [...current, data.booking]);
    trackSafeEvent("booking_click", { provider: "owned_calendar" });
  }

  if (confirmed) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Reserva recibida</p>
        <h2 className="mt-3 font-serif text-4xl font-semibold text-ink">Tu solicitud quedo registrada.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-graphite">
          Nicolle podra revisar este horario en su panel. Recibiras confirmacion por WhatsApp o email antes de la sesion.
        </p>
        <div className="mt-6 rounded-lg bg-mint p-5 text-sm text-ink">
          <p className="font-semibold">{confirmed.service}</p>
          <p className="mt-1">{new Date(confirmed.startsAt).toLocaleString("es-EC", { timeZone: "America/Guayaquil", dateStyle: "full", timeStyle: "short" })}</p>
        </div>
        <a
          href={icsHref(confirmed)}
          download="sesion-dra-niclle.ics"
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white"
        >
          Agregar a mi calendario
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-pine">Disponibilidad</p>
            <h2 className="font-serif text-3xl font-semibold text-ink">Elige un dia</h2>
          </div>
          <span className="rounded-full bg-mint px-3 py-2 text-xs font-semibold text-ink">Hora Ecuador</span>
        </div>
        <div className="mt-5 grid max-h-[460px] gap-2 overflow-auto pr-1">
          {days.map((day) => {
            const visibleAvailableCount = day.slots.filter((slot) => !bookedStarts.has(slot)).length;
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => setSelectedDay(day.key)}
                className={`rounded-lg border p-4 text-left transition ${selectedDay === day.key ? "border-pine bg-mint" : "border-ink/10 bg-linen hover:border-pine/40"}`}
              >
                <span className="block text-sm font-semibold capitalize text-ink">{day.label}</span>
                <span className="mt-1 block text-xs text-graphite">{visibleAvailableCount} espacios sugeridos disponibles</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-pine">Reserva online</p>
        <h2 className="font-serif text-3xl font-semibold text-ink">Completa tu solicitud</h2>
        <p className="mt-3 text-sm leading-6 text-graphite">Solo pedimos datos de contacto. No compartas detalles clinicos sensibles en este formulario.</p>

        <label className="mt-6 grid gap-2 text-sm font-semibold text-ink">
          Tipo de sesion
          <select value={form.service} onChange={(event) => setField("service", event.target.value as BookingService)} className="min-h-12 rounded-lg border border-ink/15 bg-white px-4 text-base">
            {bookingServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-ink">Horario</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {selectedSlots.map((slot) => {
              const unavailable = bookedStarts.has(slot) || dayIsFull;
              return (
                <button
                  type="button"
                  key={slot}
                  disabled={unavailable}
                  onClick={() => setField("startsAt", slot)}
                  className={`rounded-lg border px-3 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${form.startsAt === slot ? "border-pine bg-mint text-ink" : "border-ink/10 bg-white text-graphite hover:border-pine/40"}`}
                >
                  {displayTime(slot)}
                </button>
              );
            })}
          </div>
          {errors.startsAt ? <p className="mt-2 text-sm font-semibold text-clay">{errors.startsAt}</p> : null}
        </fieldset>

        <div className="mt-5 grid gap-4">
          <Input label="Nombre" value={form.name} onChange={(value) => setField("name", value)} error={errors.name} />
          <Input label="Celular / WhatsApp" value={form.whatsapp} onChange={(value) => setField("whatsapp", value)} error={errors.whatsapp} inputMode="tel" />
          <Input label="Email" value={form.email} onChange={(value) => setField("email", value)} error={errors.email} type="email" />
          <label htmlFor="booking-consultation-reason" className="grid gap-2 text-sm font-semibold text-ink">
            Motivo de consulta
            <textarea
              id="booking-consultation-reason"
              value={form.consultationReason}
              onChange={(event) => setField("consultationReason", event.target.value)}
              rows={4}
              maxLength={700}
              placeholder="Cuéntanos brevemente qué te gustaría conversar o revisar."
              className="min-h-28 resize-y rounded-lg border border-ink/15 bg-white px-4 py-3 text-base font-normal text-ink"
            />
            <span className="text-xs font-normal italic leading-5 text-graphite">
              Información confidencial: este motivo solo será visible para la terapeuta en su panel privado.
            </span>
            {errors.consultationReason ? <span className="text-sm text-clay">{errors.consultationReason}</span> : null}
          </label>
        </div>

        {errors.form ? <p className="mt-4 text-sm font-semibold text-clay">{errors.form}</p> : null}
        <button type="submit" disabled={loading} className="mt-6 min-h-12 w-full rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:opacity-60">
          {loading ? "Guardando..." : "Solicitar reserva"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, error, type = "text", inputMode }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; inputMode?: "tel" }) {
  const id = `booking-${label.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-")}`;
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-lg border border-ink/15 bg-white px-4 text-base text-ink"
      />
      {error ? <span className="text-sm text-clay">{error}</span> : null}
    </label>
  );
}
