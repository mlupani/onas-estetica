import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";

const spaces = [
  {
    src: images.masotherapy,
    alt: "Masoterapia facial en ONAS",
    label: "Masoterapia",
  },
  {
    src: images.cleaning,
    alt: "Tratamiento facial en ONAS",
    label: "Tratamiento facial",
  },
  {
    src: images.harmony,
    alt: "Armonización facial en ONAS",
    label: "Armonización",
  },
  {
    src: images.manicure,
    alt: "Manicura en ONAS",
    label: "Manicura",
  },
];

export function Gallery() {
  return (
    <section id="onas" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <SectionHeading
            eyebrow="El espacio"
            title="Conocé ONAS"
            subtitle="Un espacio pensado para que puedas relajarte, sentirte cómoda y disfrutar de cada visita."
          />
        </Reveal>
        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {spaces.map((space, i) => (
            <Reveal key={space.label} delay={i * 70}>
              <figure className={`relative ${i === 0 ? "sm:col-span-2 min-h-[320px] md:min-h-[460px]" : "min-h-[240px] md:min-h-[320px]"}`}>
                <Media
                  src={space.src}
                  alt={space.alt}
                  className="absolute inset-0 h-full"
                  sizes={i === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                />
                <div className="absolute inset-0 bg-[#2c241c]/12 mix-blend-multiply" />
                <figcaption className="absolute bottom-4 left-4 text-[11px] tracking-[0.22em] uppercase text-ivory">
                  {space.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
