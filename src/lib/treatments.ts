import { images } from "./images";

export type Treatment = {
  id: string;
  name: string;
  description: string;
  chatDescription: string;
  image: string;
  featured?: boolean;
};

export const treatments: Treatment[] = [
  {
    id: "botox",
    name: "Botox",
    description:
      "Tratamiento orientado a suavizar la apariencia de determinadas líneas de expresión y lograr un aspecto más descansado.",
    chatDescription:
      "El tratamiento con Botox está orientado a suavizar la apariencia de determinadas líneas de expresión y lograr un aspecto más descansado.",
    image: images.botox,
    featured: true,
  },
  {
    id: "hyaluronic",
    name: "Ácido hialurónico",
    description:
      "Tratamiento utilizado para aportar volumen, hidratación y armonía en distintas zonas del rostro.",
    chatDescription:
      "El ácido hialurónico se utiliza para aportar volumen, hidratación y armonía en distintas zonas del rostro.",
    image: images.hyaluronic,
    featured: true,
  },
  {
    id: "masotherapy",
    name: "Masoterapia facial",
    description:
      "Una experiencia de bienestar enfocada en relajar, estimular y cuidar la piel del rostro.",
    chatDescription:
      "La masoterapia facial es una experiencia de bienestar enfocada en relajar, estimular y cuidar la piel del rostro.",
    image: images.masotherapy,
    featured: true,
  },
  {
    id: "cleaning",
    name: "Limpieza facial",
    description:
      "Un cuidado pensado para renovar la piel, dejarla más luminosa y prepararla para otros tratamientos.",
    chatDescription:
      "La limpieza facial está pensada para cuidar la piel, dejarla más luminosa y prepararla para otros tratamientos.",
    image: images.cleaning,
  },
  {
    id: "rejuvenation",
    name: "Rejuvenecimiento facial",
    description:
      "Protocolos personalizados para renovar la apariencia de la piel y acompañar un aspecto más descansado.",
    chatDescription:
      "Los tratamientos de rejuvenecimiento facial buscan renovar la apariencia de la piel y acompañar un aspecto más descansado, siempre de forma personalizada.",
    image: images.rejuvenation,
  },
  {
    id: "harmony",
    name: "Armonización facial",
    description:
      "Un enfoque integral para perfilar y equilibrar las proporciones del rostro de manera natural.",
    chatDescription:
      "La armonización facial busca perfilar y equilibrar las proporciones del rostro, con un enfoque cuidadoso y natural.",
    image: images.harmony,
  },
  {
    id: "body",
    name: "Tratamientos corporales",
    description:
      "Cuidado corporal pensado para el bienestar, la relajación y el acompañamiento estético.",
    chatDescription:
      "Los tratamientos corporales están pensados para el cuidado y el bienestar del cuerpo, siempre de forma personalizada.",
    image: images.body,
  },
];

export const featuredTreatments = treatments.filter((t) => t.featured);
export const moreTreatments = treatments.filter((t) => !t.featured);

export function getTreatment(id: string) {
  return treatments.find((t) => t.id === id);
}

export const bookingTreatmentOptions = [
  { id: "botox", label: "Botox" },
  { id: "hyaluronic", label: "Ácido hialurónico" },
  { id: "masotherapy", label: "Masoterapia facial" },
  { id: "cleaning", label: "Limpieza facial" },
  { id: "other", label: "Otro" },
] as const;

export const browseTreatmentOptions = [
  { id: "botox", label: "Botox" },
  { id: "hyaluronic", label: "Ácido hialurónico" },
  { id: "masotherapy", label: "Masoterapia facial" },
  { id: "facials", label: "Tratamientos faciales" },
  { id: "body", label: "Tratamientos corporales" },
] as const;

export const extraTreatmentCopy: Record<string, string> = {
  other:
    "Podemos orientarte sobre otras alternativas según lo que estés buscando. Un miembro del equipo te va a acompañar en la consulta.",
  facials:
    "En ONAS ofrecemos distintos tratamientos faciales personalizados, desde limpiezas hasta protocolos de rejuvenecimiento y armonización.",
};
