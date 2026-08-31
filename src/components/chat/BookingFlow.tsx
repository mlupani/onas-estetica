"use client";

import { useState } from "react";

export function BookingFlow({
  onSubmit,
  disabled,
}: {
  onSubmit: (name: string, whatsapp: string) => void;
  disabled?: boolean;
}) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  return (
    <form
      className="space-y-3 border border-ink/10 bg-paper p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !whatsapp.trim()) return;
        onSubmit(name.trim(), whatsapp.trim());
      }}
    >
      <label className="block">
        <span className="mb-1.5 block text-[10px] tracking-[0.18em] uppercase text-taupe">
          Nombre
        </span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          className="w-full border border-ink/15 bg-ivory px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink"
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[10px] tracking-[0.18em] uppercase text-taupe">
          WhatsApp
        </span>
        <input
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          disabled={disabled}
          className="w-full border border-ink/15 bg-ivory px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink"
          placeholder="11 0000 0000"
          inputMode="tel"
          autoComplete="tel"
        />
      </label>
      <button
        type="submit"
        disabled={disabled}
        className="w-full cursor-pointer bg-ink py-3 text-[11px] tracking-[0.18em] uppercase text-ivory transition-colors hover:bg-accent disabled:opacity-50"
      >
        Confirmar turno
      </button>
    </form>
  );
}
