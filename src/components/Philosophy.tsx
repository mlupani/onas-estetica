import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

export function Philosophy() {
  return (
    <section id="filosofia" className="scroll-mt-24 bg-cream">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
        <Reveal className="relative min-h-[420px] lg:col-span-6 lg:min-h-[640px]">
          <Media
            src={images.philosophy}
            alt="Tratamiento facial personalizado en ONAS"
            className="absolute inset-0 h-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#2c241c]/18 mix-blend-multiply" />
        </Reveal>
        <div className="flex flex-col justify-center px-5 py-16 md:px-12 lg:col-span-6 lg:px-16 lg:py-24">
          <Reveal>
            <p className="mb-5 text-[11px] tracking-[0.32em] uppercase text-gold">
              Filosofía
            </p>
            <h2 className="font-serif text-4xl leading-[1.12] text-ink md:text-5xl lg:text-[3.35rem]">
              Tu belleza, tu esencia.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">
              En ONAS creemos que la estética debe acompañar tu esencia, no
              transformarla. Buscamos ofrecer una experiencia personalizada,
              cuidada y enfocada en resaltar tu belleza natural.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
