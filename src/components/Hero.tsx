import { MapPin } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { OpenChatButton } from "@/components/ui/OpenChatButton";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="inicio" className="relative bg-ivory lg:min-h-svh">
      <div className="grid lg:min-h-svh lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-end px-5 pb-12 pt-10 md:px-10 md:pb-16 lg:col-span-5 lg:justify-center lg:px-14 lg:pt-24 xl:px-20">
          <p className="mb-6 text-[11px] tracking-[0.34em] uppercase text-gold">
            {site.tagline}
          </p>
          <p className="font-display text-7xl leading-none tracking-[0.22em] text-ink sm:text-8xl lg:text-[5.6rem] xl:text-[6.4rem]">
            {site.name}
          </p>
          <h1 className="mt-8 max-w-md font-serif text-[1.85rem] leading-[1.15] text-ink md:text-[2.35rem] lg:text-[2.6rem]">
            {site.headline}
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
            {site.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <OpenChatButton intent="booking">Reservar mi turno</OpenChatButton>
            <Button href="#tratamientos" variant="secondary">
              Conocer tratamientos
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-[13px] text-taupe">
            <MapPin size={15} strokeWidth={1.5} />
            {site.address.short}
          </p>
        </div>

        <div className="relative order-first mt-[4.25rem] aspect-[3/2] w-full lg:order-none lg:mt-0 lg:col-span-7 lg:aspect-auto lg:min-h-svh">
          <Media
            src={images.hero}
            alt="Mujer en un entorno de clínica estética premium, con una expresión serena"
            priority
            className="absolute inset-0 h-full"
            sizes="(max-width: 1024px) 100vw, 58vw"
            imageClassName="object-contain object-center lg:object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ivory lg:via-ivory/10 lg:to-transparent" />
          <div className="absolute inset-0 bg-[#2c241c]/8 mix-blend-multiply lg:bg-[#2c241c]/15" />
        </div>
      </div>
    </section>
  );
}
