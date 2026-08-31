import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    text: "Me encantó la atención y todo el espacio. Desde el primer momento me sentí súper cómoda.",
  },
  {
    text: "Una experiencia hermosa. Todo muy cuidado y la atención excelente.",
  },
  {
    text: "El lugar es precioso y me encantó la atención personalizada.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="scroll-mt-24 bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <SectionHeading eyebrow="Voces" title="Lo que cuentan de ONAS" />
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {quotes.map((quote, i) => (
            <Reveal key={quote.text} delay={i * 80}>
              <blockquote className="border-t border-gold/40 pt-8">
                <p className="font-serif text-2xl leading-snug text-ink italic md:text-[1.65rem]">
                  “{quote.text}”
                </p>
                <footer className="mt-6 text-[11px] tracking-[0.22em] uppercase text-taupe">
                  Cliente ONAS
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
