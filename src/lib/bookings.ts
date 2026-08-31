import type { BookingDraft } from "./chat-engine";

export async function fetchTakenTimes(date: string) {
  const res = await fetch(`/api/bookings?date=${encodeURIComponent(date)}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { taken?: string[] };
  return data.taken ?? [];
}

export async function submitBooking(
  booking: BookingDraft & { name: string; whatsapp: string },
) {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (res.status === 409) return { ok: false as const, taken: true };
  if (!res.ok) return { ok: false as const, taken: false };
  return { ok: true as const };
}
