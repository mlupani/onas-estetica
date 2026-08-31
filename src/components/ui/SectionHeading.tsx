import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
}: Props) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto max-w-2xl")}>
      {eyebrow ? (
        <p className="mb-4 text-[11px] tracking-[0.32em] uppercase text-gold">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-serif text-4xl leading-[1.12] text-ink md:text-5xl lg:text-[3.4rem]">
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
