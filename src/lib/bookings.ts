import type { BookingDraft } from "./chat-engine";

export async function fetchTakenTimes(_date: string) {
  await new Promise((r) => setTimeout(r, 200));
  return [] as string[];
}

export async function submitBooking(
  _booking: BookingDraft & { name: string; whatsapp: string },
): Promise<{ ok: true } | { ok: false; taken: boolean }> {
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true as const };
}
