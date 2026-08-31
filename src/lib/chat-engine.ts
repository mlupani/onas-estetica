import { getDemoDates, demoTimes } from "./dates";
import {
  extraTreatmentCopy,
  getTreatment,
  bookingTreatmentOptions,
  browseTreatmentOptions,
} from "./treatments";
import { site } from "./site";

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

export type QuickReply = {
  id: string;
  label: string;
};

export type BookingDraft = {
  treatment?: string;
  treatmentLabel?: string;
  date?: string;
  dateLabel?: string;
  time?: string;
  name?: string;
  whatsapp?: string;
};

export type ChatFlow =
  | "welcome"
  | "booking-treatment"
  | "booking-date"
  | "booking-time"
  | "booking-details"
  | "booking-done"
  | "treatments"
  | "treatment-info"
  | "prices"
  | "location"
  | "query";

export type ChatState = {
  messages: ChatMessage[];
  replies: QuickReply[];
  flow: ChatFlow;
  booking: BookingDraft;
  showForm: boolean;
  showWhatsApp: boolean;
  selectedTreatmentId?: string;
};

export const welcomeMessage =
  "Hola 👋 Soy el asistente virtual de ONAS. ¿En qué puedo ayudarte?";

export const welcomeReplies: QuickReply[] = [
  { id: "book", label: "📅 Reservar un turno" },
  { id: "treatments", label: "💆 Ver tratamientos" },
  { id: "prices", label: "💰 Consultar precios" },
  { id: "location", label: "📍 Cómo llegar" },
  { id: "query", label: "❓ Tengo una consulta" },
];

const menuReply: QuickReply = { id: "menu", label: "Volver al inicio" };

export function createInitialState(): ChatState {
  return {
    messages: [{ id: "welcome", role: "assistant", text: welcomeMessage }],
    replies: welcomeReplies,
    flow: "welcome",
    booking: {},
    showForm: false,
    showWhatsApp: false,
  };
}

function treatmentLabel(id: string) {
  if (id === "other") return "Otro tratamiento";
  if (id === "facials") return "Tratamientos faciales";
  return getTreatment(id)?.name ?? id;
}

function treatmentCopy(id: string) {
  if (extraTreatmentCopy[id]) return extraTreatmentCopy[id];
  return (
    getTreatment(id)?.chatDescription ??
    "Podemos orientarte sobre este tratamiento en una consulta personalizada."
  );
}

export function buildWhatsAppBookingMessage(booking: BookingDraft) {
  const parts = [
    "Hola, quiero continuar una solicitud de turno en ONAS.",
    booking.treatmentLabel ? `Tratamiento: ${booking.treatmentLabel}` : null,
    booking.dateLabel ? `Día: ${booking.dateLabel}` : null,
    booking.time ? `Horario: ${booking.time}` : null,
    booking.name ? `Nombre: ${booking.name}` : null,
  ].filter(Boolean);
  return parts.join("\n");
}

export function nextFromReply(
  state: ChatState,
  reply: QuickReply,
): Partial<ChatState> & { assistant: string[] } {
  const id = reply.id;

  if (id === "menu") {
    return {
      flow: "welcome",
      replies: welcomeReplies,
      showForm: false,
      showWhatsApp: false,
      assistant: ["¿En qué más puedo ayudarte?"],
    };
  }

  if (id === "book" || id.startsWith("book:")) {
    const preset = id.startsWith("book:") ? id.slice(5) : undefined;
    if (preset) {
      const label = treatmentLabel(preset);
      return {
        flow: "booking-date",
        booking: {
          ...state.booking,
          treatment: preset,
          treatmentLabel: label,
        },
        replies: getDemoDates().map((d) => ({ id: d.id, label: d.label })),
        showForm: false,
        showWhatsApp: false,
        assistant: [
          `Perfecto, ${label}. ¿Qué día te gustaría venir?`,
        ],
      };
    }
    return {
      flow: "booking-treatment",
      booking: {},
      replies: bookingTreatmentOptions.map((t) => ({
        id: `bt:${t.id}`,
        label: t.label,
      })),
      showForm: false,
      showWhatsApp: false,
      assistant: [
        "¡Claro! Para ayudarte a reservar, ¿qué tratamiento te interesa?",
      ],
    };
  }

  if (id.startsWith("bt:")) {
    const treatmentId = id.slice(3);
    const label = treatmentLabel(treatmentId);
    return {
      flow: "booking-date",
      booking: {
        ...state.booking,
        treatment: treatmentId,
        treatmentLabel: label,
      },
      replies: getDemoDates().map((d) => ({ id: d.id, label: d.label })),
      assistant: ["¿Qué día te gustaría venir?"],
    };
  }

  if (id.startsWith("date:")) {
    const value = id.slice(5);
    return {
      flow: "booking-time",
      booking: { ...state.booking, date: value, dateLabel: reply.label },
      replies: demoTimes.map((t) => ({ id: `time:${t}`, label: t })),
      assistant: ["Estos son algunos horarios disponibles:"],
    };
  }

  if (id.startsWith("time:")) {
    const time = id.slice(5);
    return {
      flow: "booking-details",
      booking: { ...state.booking, time },
      replies: [],
      showForm: true,
      assistant: [
        "Perfecto. Para confirmar tu turno necesito tu nombre y WhatsApp.",
      ],
    };
  }

  if (id === "treatments") {
    return {
      flow: "treatments",
      replies: browseTreatmentOptions.map((t) => ({
        id: `info:${t.id}`,
        label: t.label,
      })),
      showForm: false,
      showWhatsApp: false,
      assistant: [
        "Tenemos diferentes tratamientos faciales y corporales. ¿Qué te interesa conocer?",
      ],
    };
  }

  if (id.startsWith("info:")) {
    const treatmentId = id.slice(5);
    return {
      flow: "treatment-info",
      selectedTreatmentId: treatmentId,
      replies: [
        {
          id: `book:${treatmentId === "facials" ? "other" : treatmentId}`,
          label: "Quiero consultar por este tratamiento",
        },
        menuReply,
      ],
      assistant: [treatmentCopy(treatmentId)],
    };
  }

  if (id === "prices") {
    return {
      flow: "prices",
      replies: [
        ...bookingTreatmentOptions.map((t) => ({
          id: `price:${t.id}`,
          label: t.label,
        })),
        menuReply,
      ],
      showForm: false,
      assistant: [
        "Los valores pueden variar según el tratamiento y la evaluación de cada caso. Si querés, puedo ayudarte a consultar el precio del tratamiento que te interesa.",
      ],
    };
  }

  if (id.startsWith("price:")) {
    const treatmentId = id.slice(6);
    const label = treatmentLabel(treatmentId);
    return {
      flow: "prices",
      selectedTreatmentId: treatmentId,
      replies: [
        {
          id: `book:${treatmentId}`,
          label: "Quiero consultar por este tratamiento",
        },
        menuReply,
      ],
      assistant: [
        `Los valores de ${label} se confirman según la evaluación de cada caso. Si querés, te ayudo a dejar una consulta y el equipo de ONAS te orienta.`,
      ],
    };
  }

  if (id === "location") {
    return {
      flow: "location",
      replies: [
        { id: "book", label: "Reservar un turno" },
        menuReply,
      ],
      showWhatsApp: false,
      assistant: [
        `Estamos en ${site.address.street}, ${site.address.locality}, ${site.address.region}.`,
      ],
    };
  }

  if (id === "query") {
    return {
      flow: "query",
      replies: [menuReply],
      showWhatsApp: true,
      assistant: [
        "Contame en qué podemos ayudarte. También podés escribirnos por WhatsApp y una persona del equipo te responde.",
      ],
    };
  }

  return {
    flow: "welcome",
    replies: welcomeReplies,
    assistant: ["¿En qué puedo ayudarte?"],
  };
}

export function nextFromText(text: string): Partial<ChatState> & {
  assistant: string[];
} {
  const q = text.toLowerCase();

  if (
    q.includes("turno") ||
    q.includes("reserv") ||
    q.includes("agenda")
  ) {
    return {
      flow: "booking-treatment",
      replies: bookingTreatmentOptions.map((t) => ({
        id: `bt:${t.id}`,
        label: t.label,
      })),
      assistant: [
        "¡Claro! Para ayudarte a reservar, ¿qué tratamiento te interesa?",
      ],
    };
  }

  if (q.includes("precio") || q.includes("valor") || q.includes("costo")) {
    return {
      flow: "prices",
      replies: bookingTreatmentOptions.map((t) => ({
        id: `price:${t.id}`,
        label: t.label,
      })),
      assistant: [
        "Los valores pueden variar según el tratamiento y la evaluación de cada caso. Si querés, puedo ayudarte a consultar el precio del tratamiento que te interesa.",
      ],
    };
  }

  if (
    q.includes("dónde") ||
    q.includes("donde") ||
    q.includes("ubic") ||
    q.includes("llegar") ||
    q.includes("direc")
  ) {
    return {
      flow: "location",
      replies: [
        { id: "book", label: "Reservar un turno" },
        menuReply,
      ],
      assistant: [
        `Estamos en ${site.address.street}, ${site.address.locality}, ${site.address.region}.`,
      ],
    };
  }

  if (
    q.includes("tratamiento") ||
    q.includes("botox") ||
    q.includes("hialur") ||
    q.includes("masaje") ||
    q.includes("facial")
  ) {
    return {
      flow: "treatments",
      replies: browseTreatmentOptions.map((t) => ({
        id: `info:${t.id}`,
        label: t.label,
      })),
      assistant: [
        "Tenemos diferentes tratamientos faciales y corporales. ¿Qué te interesa conocer?",
      ],
    };
  }

  return {
    flow: "query",
    replies: welcomeReplies,
    showWhatsApp: true,
    assistant: [
      "Gracias por tu mensaje. Un miembro del equipo puede ayudarte con eso. ¿Querés que te oriente con alguna de estas opciones?",
    ],
  };
}

export function bookingCompleteMessage(booking: BookingDraft) {
  const name = booking.name ? `, ${booking.name}` : "";
  const treatment = booking.treatmentLabel ?? "tu tratamiento";
  const when = [booking.dateLabel, booking.time]
    .filter(Boolean)
    .join(" a las ");
  const whenText = when ? ` para el ${when}` : "";
  return `¡Listo${name}! Tu turno de ${treatment} quedó agendado${whenText}. Te vamos a enviar un recordatorio por WhatsApp antes de tu cita.`;
}
