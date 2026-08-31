import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "¿Cómo puedo reservar un turno?",
    a: "Podés reservar desde el asistente de esta página. El turno se agenda al instante y te enviamos un recordatorio por WhatsApp antes de tu cita.",
  },
  {
    q: "¿Dónde está ONAS?",
    a: "Estamos en Manuel Ocampo 310, Lanús Oeste, Buenos Aires.",
  },
  {
    q: "¿Qué tratamientos realizan?",
    a: "Realizamos tratamientos faciales y corporales, entre ellos Botox, ácido hialurónico, masoterapia facial, limpieza facial, rejuvenecimiento, armonización facial y tratamientos corporales.",
  },
  {
    q: "¿Puedo consultar qué tratamiento es adecuado para mí?",
    a: "Sí. Podés hablar con el asistente o dejar una consulta para que te orientemos según tus objetivos.",
  },
  {
    q: "¿Cómo puedo conocer los precios?",
    a: "Los valores pueden variar según el tratamiento y la evaluación de cada caso. Consultanos por el tratamiento que te interesa y te orientamos.",
  },
  {
    q: "¿Puedo cancelar o reprogramar mi turno?",
    a: "Sí. Comunicate con el equipo de ONAS por WhatsApp o a través del asistente y te ayudamos a reprogramarlo.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Consultas"
              title="Preguntas frecuentes"
            />
          </Reveal>
          <div className="lg:col-span-7">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 40}>
                <details className="group border-b border-ink/10">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left">
                    <h3 className="font-serif text-xl text-ink md:text-[1.35rem]">
                      {item.q}
                    </h3>
                    <span className="relative h-4 w-4 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-4 bg-ink" />
                      <span className="absolute top-0 left-1/2 h-4 w-px bg-ink transition-transform duration-300 group-open:rotate-90" />
                    </span>
                  </summary>
                  <p className="max-w-xl pb-5 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
