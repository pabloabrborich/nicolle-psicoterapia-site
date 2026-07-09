"use client";

import { useEffect, useMemo, useState } from "react";
import { displayDate, displayTime, type Booking, type BookingStatus } from "@/lib/booking";

export function AdminAgenda() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("booking-admin-token") || "";
    setSavedToken(stored);
  }, []);

  useEffect(() => {
    if (!savedToken) return;
    loadBookings(savedToken);
  }, [savedToken]);

  const grouped = useMemo(() => {
    return bookings.reduce<Record<string, Booking[]>>((acc, booking) => {
      const key = booking.startsAt.slice(0, 10);
      acc[key] = acc[key] || [];
      acc[key].push(booking);
      return acc;
    }, {});
  }, [bookings]);

  async function loadBookings(authToken: string) {
    const response = await fetch("/api/bookings?admin=1", { headers: { "x-admin-token": authToken } });
    if (!response.ok) {
      setError("Clave incorrecta o sesion expirada.");
      setBookings([]);
      return;
    }
    const data = (await response.json()) as { bookings: Booking[] };
    setError("");
    setBookings(data.bookings || []);
  }

  async function changeStatus(id: string, status: BookingStatus) {
    const response = await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": savedToken },
      body: JSON.stringify({ id, status })
    });
    if (response.ok) loadBookings(savedToken);
  }

  if (!savedToken) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
        <h1 className="font-serif text-4xl font-semibold text-ink">Agenda privada</h1>
        <p className="mt-3 text-sm leading-6 text-graphite">Ingresa la clave de administracion para revisar reservas.</p>
        <form
          className="mt-5 grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            sessionStorage.setItem("booking-admin-token", token);
            setSavedToken(token);
          }}
        >
          <label className="grid gap-2 text-sm font-semibold text-ink">
            Clave
            <input value={token} onChange={(event) => setToken(event.target.value)} type="password" className="min-h-12 rounded-lg border border-ink/15 px-4" />
          </label>
          <button className="rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Panel privado</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Agenda de Nicolle</h1>
          <p className="mt-3 text-sm leading-6 text-graphite">Reservas recibidas desde el website. Confirma, cancela o revisa datos de contacto.</p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("booking-admin-token");
            setSavedToken("");
          }}
          className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink"
        >
          Salir
        </button>
      </div>

      {error ? <p className="mt-6 rounded-lg bg-white p-4 text-sm font-semibold text-clay">{error}</p> : null}

      <div className="mt-8 grid gap-5">
        {Object.entries(grouped).length ? (
          Object.entries(grouped).map(([day, items]) => (
            <section key={day} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
              <h2 className="font-serif text-3xl font-semibold capitalize text-ink">{displayDate(`${day}T12:00:00-05:00`)}</h2>
              <div className="mt-4 grid gap-3">
                {items.map((booking) => (
                  <article key={booking.id} className="grid gap-4 rounded-lg bg-linen p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                    <div>
                      <p className="text-lg font-semibold text-ink">{displayTime(booking.startsAt)}</p>
                      <p className="text-xs font-semibold uppercase text-clay">{booking.status}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{booking.service}</h3>
                      <p className="mt-1 text-sm text-graphite">{booking.name} - {booking.whatsapp} - {booking.email}</p>
                      {booking.consultationReason ? (
                        <div className="mt-3 rounded-lg border border-ink/10 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">Motivo de consulta</p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-graphite">{booking.consultationReason}</p>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => changeStatus(booking.id, "confirmed")} className="rounded-full bg-pine px-4 py-2 text-xs font-semibold text-white">Confirmar</button>
                      <button onClick={() => changeStatus(booking.id, "cancelled")} className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink">Cancelar</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-lg bg-white p-8 text-sm text-graphite shadow-soft">Aun no hay reservas registradas.</div>
        )}
      </div>
    </div>
  );
}
