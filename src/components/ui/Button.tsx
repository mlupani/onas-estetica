import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory hover:bg-accent hover:text-ivory border border-ink",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-ivory",
  ghost:
    "bg-transparent text-ink border-0 hover:text-accent underline-offset-4 hover:underline",
  light:
    "bg-ivory text-ink border border-ivory hover:bg-cream",
  accent:
    "bg-accent text-ivory border border-accent hover:bg-ink",
};

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  type = "button",
  onClick,
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 cursor-pointer",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
