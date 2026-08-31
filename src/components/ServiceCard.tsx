import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { OpenChatButton } from "@/components/ui/OpenChatButton";
import type { Treatment } from "@/lib/treatments";

export function ServiceCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-ink md:min-h-[520px]">
      <Media
        src={treatment.image}
        alt={`${treatment.name} en ONAS`}
        className="absolute inset-0"
        sizes="(max-width: 768px) 100vw, 33vw"
        imageClassName="group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
      <div className="relative z-10 flex flex-col gap-4 p-7 md:p-8">
        <h3 className="font-serif text-3xl text-ivory md:text-[2rem]">
          {treatment.name}
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-ivory/80">
          {treatment.description}
        </p>
        <OpenChatButton
          intent="treatments"
          treatment={treatment.id}
          variant="light"
          className="w-fit px-5 py-2.5"
        >
          Consultar
          <ArrowUpRight size={15} />
        </OpenChatButton>
      </div>
    </article>
  );
}
