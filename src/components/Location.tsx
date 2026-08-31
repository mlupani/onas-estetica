import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMapsEmbedUrl, getMapsUrl } from "@/lib/integrations";
import { site } from "@/lib/site";

export function Location() {
  return (
    <section id="ubicacion" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:px-14">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Ubicación"
            title="Encontranos en Lanús Oeste"
          />
          <div className="mt-10 flex items-start gap-3 text-muted">
            <MapPin size={18} className="mt-1 shrink-0 text-gold" />
            <p className="leading-relaxed">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
            </p>
          </div>
          <Button href={getMapsUrl()} variant="primary" className="mt-8" target="_blank" rel="noopener noreferrer">
            Cómo llegar
          </Button>
        </Reveal>

        <Reveal className="relative min-h-[320px] overflow-hidden bg-sand lg:col-span-7 lg:min-h-[420px]">
          <iframe
            title="ONAS Estética Integral en Google Maps"
            src={getMapsEmbedUrl()}
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
