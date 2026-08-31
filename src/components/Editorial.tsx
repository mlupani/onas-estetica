import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";

const frames = [
  {
    src: images.editorialMain,
    alt: "Masoterapia facial en ONAS",
    label: "Belleza natural",
    className: "md:col-span-7 md:row-span-2 min-h-[420px] md:min-h-[640px]",
  },
  {
    src: images.editorialSkincare,
    alt: "Resultado de tratamiento facial en ONAS",
    label: "Bienestar",
    className: "md:col-span-5 min-h-[240px] md:min-h-[310px]",
  },
  {
    src: images.editorialClinic,
    alt: "Manicura en ONAS",
    label: "Tratamientos personalizados",
    className: "md:col-span-5 min-h-[240px] md:min-h-[310px]",
  },
];

export function Editorial() {
  return (
    <section className="bg-paper py-8 md:py-12">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
            {frames.map((frame) => (
              <figure key={frame.src} className={`relative ${frame.className}`}>
                <Media
                  src={frame.src}
                  alt={frame.alt}
                  className="absolute inset-0 h-full"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-[#2c241c]/12 mix-blend-multiply" />
                <figcaption className="absolute bottom-5 left-5 bg-ivory/90 px-4 py-2 font-serif text-sm italic text-ink backdrop-blur-sm">
                  {frame.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
