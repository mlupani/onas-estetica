import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { demoTimes } from "./dates";

export type StoredBooking = {
  id: string;
  treatment?: string;
  treatmentLabel?: string;
  date: string;
  dateLabel?: string;
  time: string;
  name: string;
  whatsapp: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "bookings.json");

let cache: StoredBooking[] | null = null;
let mutex = Promise.resolve();

function withLock<T>(fn: () => Promise<T>) {
  const run = mutex.then(fn, fn);
  mutex = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function load() {
  if (cache) return cache;
  try {
    const raw = await readFile(filePath, "utf8");
    cache = JSON.parse(raw) as StoredBooking[];
  } catch {
    cache = [];
  }
  return cache;
}

async function save(bookings: StoredBooking[]) {
  cache = bookings;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(bookings, null, 2), "utf8");
}

export function isValidTime(time: string) {
  return (demoTimes as readonly string[]).includes(time);
}

export async function getTakenTimes(date: string) {
  const bookings = await load();
  return bookings.filter((b) => b.date === date).map((b) => b.time);
}

export async function createStoredBooking(
  input: Omit<StoredBooking, "id" | "createdAt">,
) {
  return withLock(async () => {
    const bookings = await load();
    if (bookings.some((b) => b.date === input.date && b.time === input.time)) {
      return { ok: false as const, reason: "taken" as const };
    }
    const booking: StoredBooking = {
      ...input,
      id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    await save([...bookings, booking]);
    return { ok: true as const, booking };
  });
}
