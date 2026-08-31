import { NextResponse } from "next/server";
import {
  createStoredBooking,
  getTakenTimes,
  isValidTime,
} from "@/lib/bookings-store";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");
  if (!date) {
    return NextResponse.json({ taken: [] });
  }
  const taken = await getTakenTimes(date);
  return NextResponse.json({ taken });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    treatment?: string;
    treatmentLabel?: string;
    date?: string;
    dateLabel?: string;
    time?: string;
    name?: string;
    whatsapp?: string;
  };

  const date = body.date?.trim();
  const time = body.time?.trim();
  const name = body.name?.trim();
  const whatsapp = body.whatsapp?.trim();

  if (!date || !time || !name || !whatsapp || !isValidTime(time)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const result = await createStoredBooking({
    treatment: body.treatment,
    treatmentLabel: body.treatmentLabel,
    date,
    dateLabel: body.dateLabel,
    time,
    name,
    whatsapp,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "taken" }, { status: 409 });
  }

  return NextResponse.json({ ok: true, booking: result.booking });
}
