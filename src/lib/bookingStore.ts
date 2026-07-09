import { addMinutes, bookingDurationMinutes, type Booking, type BookingStatus } from "./booking";

declare global {
  var __therapyBookings: Booking[] | undefined;
}

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const tableName = process.env.SUPABASE_BOOKINGS_TABLE || "therapy_bookings";

function memoryStore() {
  globalThis.__therapyBookings = globalThis.__therapyBookings || [];
  return globalThis.__therapyBookings;
}

function hasSupabase() {
  return Boolean(supabaseUrl && supabaseKey);
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const baseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  const isNewSecretKey = supabaseKey.startsWith("sb_secret_");
  const headers = new Headers(init?.headers);
  headers.set("apikey", supabaseKey);
  headers.set("Content-Type", "application/json");
  headers.set("Prefer", "return=representation");
  if (!isNewSecretKey) {
    headers.set("Authorization", `Bearer ${supabaseKey}`);
  }

  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${details}`);
  }

  return response.json();
}

export async function listBookings() {
  if (hasSupabase()) {
    const rows = (await supabaseFetch(`${tableName}?select=*`)) as Booking[];
    return rows.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }

  return [...memoryStore()].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function createBooking(input: Omit<Booking, "id" | "createdAt" | "status" | "endsAt">) {
  const startsAt = new Date(input.startsAt);
  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    startsAt: startsAt.toISOString(),
    endsAt: addMinutes(startsAt, bookingDurationMinutes(input.service)).toISOString(),
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const existing = await listBookings();
  const isTaken = existing.some((item) => item.startsAt === booking.startsAt && item.status !== "cancelled");
  if (isTaken) {
    throw new Error("slot_taken");
  }

  if (hasSupabase()) {
    const rows = (await supabaseFetch(tableName, {
      method: "POST",
      body: JSON.stringify(booking)
    })) as Booking[];
    return rows[0] || booking;
  }

  memoryStore().push(booking);
  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  if (hasSupabase()) {
    const rows = (await supabaseFetch(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    })) as Booking[];
    return rows[0] || null;
  }

  const booking = memoryStore().find((item) => item.id === id);
  if (!booking) return null;
  booking.status = status;
  return booking;
}
