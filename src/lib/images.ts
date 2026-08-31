const local = (file: string) => `/images/${file}`;

export const images = {
  logo: local("logo.jpg"),
  hero: local("hero.jpg"),
  og: local("og.jpg"),
  botox: local("aesthetic-medicine.jpg"),
  hyaluronic: local("lips.webp"),
  masotherapy: local("masotherapy.webp"),
  cleaning: local("facial-mask.jpg"),
  rejuvenation: local("facial-treatment.jpg"),
  harmony: local("harmony.webp"),
  body: local("body-treatment.jpg"),
  manicure: local("manicure.jpg"),
  editorialMain: local("masotherapy.webp"),
  editorialSkincare: local("portrait.webp"),
  editorialClinic: local("nails.webp"),
  philosophy: local("facial-treatment.jpg"),
} as const;

export type ImageKey = keyof typeof images;
