import { Logo } from "@/components/ui/Logo";
import { getMapsUrl, getWhatsAppUrl, integrations } from "@/lib/integrations";
import { site } from "@/lib/site";

const links = [
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#reservar", label: "Reservar turno" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: getWhatsAppUrl(), label: "Contacto", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:px-14">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo className="h-20 w-20" size={120} />
            <p className="mt-3 text-sm text-muted">{site.tagline}</p>
          </div>
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] tracking-[0.16em] uppercase text-taupe transition-colors hover:text-ink"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <a
              href={integrations.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] tracking-[0.16em] uppercase text-taupe transition-colors hover:text-ink"
            >
              Instagram
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] tracking-[0.16em] uppercase text-taupe transition-colors hover:text-ink"
            >
              WhatsApp
            </a>
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] tracking-[0.16em] uppercase text-taupe transition-colors hover:text-ink"
            >
              {site.address.street}
            </a>
          </div>
        </div>
        <p className="mt-16 text-[11px] tracking-[0.14em] uppercase text-taupe/80">
          © {new Date().getFullYear()} ONAS · Lanús Oeste
        </p>
      </div>
    </footer>
  );
}
