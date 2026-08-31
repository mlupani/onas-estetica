"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/site";
import { openChat } from "@/lib/chat-events";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-ivory/90 backdrop-blur-md border-b border-ink/8"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
        <a href="#inicio" className="flex items-center" aria-label="ONAS">
          <Logo className="h-12 w-12 md:h-14 md:w-14" size={80} priority />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.22em] uppercase text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openChat({ intent: "booking" })}
            className="hidden cursor-pointer bg-ink px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase text-ivory transition-colors hover:bg-accent sm:inline-flex"
          >
            Reservar turno
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer p-2 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-ink/8 bg-ivory lg:hidden">
          <nav className="flex min-h-[calc(100svh-4.25rem)] flex-col gap-1 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/8 py-4 font-serif text-3xl text-ink"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openChat({ intent: "booking" });
              }}
              className="mt-8 cursor-pointer bg-ink px-6 py-4 text-[12px] tracking-[0.22em] uppercase text-ivory"
            >
              Reservar turno
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
