import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OpenChatButton } from "@/components/ui/OpenChatButton";
import { Reveal } from "@/components/ui/Reveal";
import { getWhatsAppUrl } from "@/lib/integrations";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section id="reservar" className="scroll-mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] uppercase text-gold">
            Reserva
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] md:text-6xl">
            ¿Querés comenzar?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            Reservá tu turno y descubrí una experiencia de estética pensada para
            vos.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <OpenChatButton intent="booking" variant="light">
              Reservar mi turno
            </OpenChatButton>
            <Button
              href={getWhatsAppUrl()}
              variant="secondary"
              className="border-ivory/25 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </Button>
          </div>
          <p className="mt-10 flex items-center gap-2 text-sm text-ivory/55">
            <MapPin size={15} />
            {site.address.short}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
