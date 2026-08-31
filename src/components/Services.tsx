import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { OpenChatButton } from "@/components/ui/OpenChatButton";
import { featuredTreatments, moreTreatments } from "@/lib/treatments";

export function Services() {
  return (
    <section id="tratamientos" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <SectionHeading
            eyebrow="Tratamientos"
            title="Tratamientos pensados para vos"
            subtitle="Encontrá el tratamiento ideal para cuidar, renovar y realzar tu piel."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {featuredTreatments.map((treatment, i) => (
            <Reveal key={treatment.id} delay={i * 80}>
              <ServiceCard treatment={treatment} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border-t border-ink/10 pt-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold lg:col-span-3">
              Otros cuidados
            </p>
            <ul className="lg:col-span-9">
              {moreTreatments.map((treatment) => (
                <li
                  key={treatment.id}
                  className="group flex flex-col gap-4 border-b border-ink/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative size-16 shrink-0 overflow-hidden bg-sand md:size-20">
                      <Image
                        src={treatment.image}
                        alt={`${treatment.name} en ONAS`}
                        fill
                        sizes="80px"
                        className="object-cover onas-photo transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="max-w-xl">
                      <h3 className="font-serif text-2xl text-ink">
                        {treatment.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {treatment.description}
                      </p>
                    </div>
                  </div>
                  <OpenChatButton
                    intent="treatments"
                    treatment={treatment.id}
                    variant="ghost"
                    className="w-fit px-0 tracking-[0.14em]"
                  >
                    Consultar
                    <ArrowRight size={15} />
                  </OpenChatButton>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
