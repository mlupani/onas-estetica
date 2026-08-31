import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function Media({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "100vw",
}: Props) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-sand", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover onas-photo transition-transform duration-700 ease-out",
          imageClassName,
        )}
      />
    </div>
  );
}
