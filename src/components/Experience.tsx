import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Consultamos",
    text: "Conocemos tus necesidades y objetivos.",
  },
  {
    n: "02",
    title: "Evaluamos",
    text: "Te orientamos sobre las alternativas disponibles para vos.",
  },
  {
    n: "03",
    title: "Elegís tu tratamiento",
    text: "Definimos juntos la opción más adecuada.",
  },
  {
    n: "04",
    title: "Disfrutás tu experiencia",
    text: "Coordinamos tu turno y te acompañamos durante el proceso.",
  },
];

export function Experience() {
  return (
    <section
      id="experiencia"
      className="scroll-mt-24 bg-ivory py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <SectionHeading
            eyebrow="El proceso"
            title="Tu experiencia en ONAS"
          />
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <article className="relative border-t border-ink/15 pt-8">
                <p className="font-serif text-6xl text-gold/70 md:text-7xl">
                  {step.n}
                </p>
                <h3 className="mt-6 font-serif text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
