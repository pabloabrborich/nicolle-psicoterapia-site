import { NextRequest, NextResponse } from "next/server";
import { bookingServices, validateBookingInput, type Booking, type BookingStatus } from "@/lib/booking";
import { createBooking, listBookings, updateBookingStatus } from "@/lib/bookingStore";

export const dynamic = "force-dynamic";

function isAdmin(request: NextRequest) {
  const token = request.headers.get("x-admin-token");
  return Boolean(token && token === (process.env.BOOKING_ADMIN_TOKEN || "cambiar-esta-clave"));
}

export async function GET(request: NextRequest) {
  const bookings = await listBookings();
  const admin = request.nextUrl.searchParams.get("admin") === "1";

  if (admin && !isAdmin(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (admin) {
    return NextResponse.json({ bookings });
  }

  return NextResponse.json({
    bookings: bookings
      .filter((booking) => booking.status !== "cancelled")
      .map(({ id, service, startsAt, endsAt, status }) => ({ id, service, startsAt, endsAt, status }))
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<Booking>;
  const errors = validateBookingInput(body);

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    const booking = await createBooking({
      service: body.service || bookingServices[0],
      startsAt: body.startsAt || "",
      name: body.name?.trim() || "",
      email: body.email?.trim() || "",
      whatsapp: body.whatsapp?.trim() || "",
      consultationReason: body.consultationReason?.trim() || ""
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "slot_taken") {
      return NextResponse.json({ error: "slot_taken" }, { status: 409 });
    }

    return NextResponse.json({ error: "booking_failed" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; status?: BookingStatus };
  if (!body.id || !body.status || !["pending", "confirmed", "cancelled"].includes(body.status)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 422 });
  }

  const booking = await updateBookingStatus(body.id, body.status);
  if (!booking) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
