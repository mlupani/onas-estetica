import Image from "next/image";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  size = 56,
  priority,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={images.logo}
      alt={site.name}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}
