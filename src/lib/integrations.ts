export const integrations = {
  whatsapp: {
    phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5491176544601",
    defaultMessage: "Hola, quiero consultar por un turno en ONAS.",
    launcherUrl:
      "https://api.whatsapp.com/send/?phone=5491176544601&text=Hola%21%20C%C3%B3mo%20estan%3F%20Quisiera%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Onas%20%F0%9F%A7%96%F0%9F%8D%83",
  },
  instagram: {
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/onasestetica/",
  },
  maps: {
    url: "https://www.google.com.ar/maps/place/ONAS+Est%C3%A9tica+Integral/@-34.6990757,-58.3976692,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccdb139598975:0xfe20992c18e05669!8m2!3d-34.6990801!4d-58.3950943!16s%2Fg%2F11tcbr_60j?hl=es&entry=ttu",
    embedUrl:
      "https://www.google.com/maps?q=ONAS+Estética+Integral,+Manuel+Ocampo+310,+Lanús+Oeste&hl=es&z=17&output=embed",
  },
  analytics: {
    enabled: false,
  },
  assistant: {
    mode: "demo" as "demo" | "agent",
  },
  booking: {
    mode: "backend" as "demo" | "backend",
  },
};

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? integrations.whatsapp.defaultMessage,
  );
  return `https://wa.me/${integrations.whatsapp.phone}?text=${text}`;
}

export function getMapsUrl() {
  return integrations.maps.url;
}

export function getMapsEmbedUrl() {
  return integrations.maps.embedUrl;
}
