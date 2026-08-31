"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Minimize2, RotateCcw, Send, X } from "lucide-react";
import { BookingFlow } from "@/components/chat/BookingFlow";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import {
  bookingCompleteMessage,
  buildWhatsAppBookingMessage,
  createInitialState,
  nextFromReply,
  nextFromText,
  type ChatState,
  type QuickReply,
} from "@/lib/chat-engine";
import { fetchTakenTimes, submitBooking } from "@/lib/bookings";
import { OPEN_CHAT_EVENT, type OpenChatDetail } from "@/lib/chat-events";
import { demoTimes, getDemoDates } from "@/lib/dates";
import { getMapsUrl, getWhatsAppUrl, integrations } from "@/lib/integrations";
import { getTreatment } from "@/lib/treatments";
import { cn } from "@/lib/cn";

let msgCount = 0;
const uid = () => `m-${++msgCount}`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ChatState>(createInitialState);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const typingRef = useRef(false);
  const stateRef = useRef(state);
  const bottomRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, typing, state.showForm, open]);

  const speak = useCallback(
    (partial: Partial<ChatState> & { assistant: string[] }) => {
      if (typingRef.current) return;
      const { assistant, ...rest } = partial;
      typingRef.current = true;
      setTyping(true);
      window.setTimeout(() => {
        setState((prev) => ({
          ...prev,
          ...rest,
          messages: [
            ...prev.messages,
            ...assistant.map((text) => ({
              id: uid(),
              role: "assistant" as const,
              text,
            })),
          ],
        }));
        setTyping(false);
        typingRef.current = false;
      }, 720);
    },
    [],
  );

  const addUser = useCallback((text: string) => {
    setState((prev) => ({
      ...prev,
      replies: [],
      showForm: false,
      showWhatsApp: false,
      messages: [...prev.messages, { id: uid(), role: "user", text }],
    }));
  }, []);

  const handleReply = useCallback(
    (reply: QuickReply) => {
      if (typingRef.current) return;
      addUser(reply.label);
      window.setTimeout(async () => {
        const next = nextFromReply(stateRef.current, reply);
        if (!reply.id.startsWith("date:")) {
          speak(next);
          return;
        }
        const taken = await fetchTakenTimes(reply.id.slice(5));
        const replies = demoTimes
          .filter((time) => !taken.includes(time))
          .map((time) => ({ id: `time:${time}`, label: time }));
        if (replies.length === 0) {
          speak({
            flow: "booking-date",
            booking: next.booking,
            replies: getDemoDates().map((d) => ({ id: d.id, label: d.label })),
            assistant: [
              "Ese día ya no tiene horarios disponibles. ¿Qué otro día te gustaría?",
            ],
          });
          return;
        }
        speak({ ...next, replies });
      }, 30);
    },
    [addUser, speak],
  );

  const handleText = useCallback(
    (text: string) => {
      if (typingRef.current || !text.trim()) return;
      const value = text.trim();
      setDraft("");
      addUser(value);
      window.setTimeout(() => speak(nextFromText(value)), 30);
    },
    [addUser, speak],
  );

  const handleDetails = useCallback(
    (name: string, whatsapp: string) => {
      if (typingRef.current) return;
      const booking = { ...stateRef.current.booking, name, whatsapp };
      setState((prev) => ({
        ...prev,
        showForm: false,
        booking,
        messages: [
          ...prev.messages,
          { id: uid(), role: "user", text: `${name} · ${whatsapp}` },
        ],
      }));
      window.setTimeout(async () => {
        const result = await submitBooking(booking);
        if (!result.ok) {
          speak({
            flow: "booking-date",
            replies: getDemoDates().map((d) => ({ id: d.id, label: d.label })),
            showForm: false,
            assistant: [
              result.taken
                ? "Ese horario ya no está disponible. ¿Qué otro día te gustaría?"
                : "No pude confirmar el turno. ¿Probamos con otro día?",
            ],
          });
          return;
        }
        speak({
          flow: "booking-done",
          replies: [{ id: "menu", label: "Hacer otra consulta" }],
          showForm: false,
          showWhatsApp: false,
          assistant: [bookingCompleteMessage(booking)],
        });
      }, 30);
    },
    [speak],
  );

  const reset = useCallback(() => {
    msgCount = 0;
    typingRef.current = false;
    setTyping(false);
    setDraft("");
    setState(createInitialState());
  }, []);

  const openWithIntent = useCallback(
    (detail: OpenChatDetail = {}) => {
      setOpen(true);
      if (!detail.intent && !detail.treatment) return;

      const treatmentName = detail.treatment
        ? getTreatment(detail.treatment)?.name
        : undefined;

      const reply: QuickReply | null = detail.treatment
        ? detail.intent === "booking"
          ? {
              id: `book:${detail.treatment}`,
              label: `Reservar ${treatmentName ?? "turno"}`,
            }
          : {
              id: `info:${detail.treatment}`,
              label: treatmentName ?? "Ver tratamientos",
            }
        : detail.intent === "booking"
          ? { id: "book", label: "📅 Reservar un turno" }
          : detail.intent === "treatments"
            ? { id: "treatments", label: "💆 Ver tratamientos" }
            : detail.intent === "prices"
              ? { id: "prices", label: "💰 Consultar precios" }
              : detail.intent === "location"
                ? { id: "location", label: "📍 Cómo llegar" }
                : detail.intent === "query"
                  ? { id: "query", label: "❓ Tengo una consulta" }
                  : null;

      if (!reply) return;
      reset();
      window.setTimeout(() => handleReply(reply), 280);
    },
    [handleReply, reset],
  );

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenChatDetail>).detail ?? {};
      openWithIntent(detail);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [openWithIntent]);

  const whatsappHref = getWhatsAppUrl(
    state.flow === "booking-done"
      ? buildWhatsAppBookingMessage(state.booking)
      : undefined,
  );

  return (
    <>
      {open ? (
        <div
          className={cn(
            "floating-fixed chat-panel pointer-events-auto z-[60] flex flex-col overflow-hidden bg-ivory shadow-[0_24px_80px_rgba(28,22,18,0.18)]",
            "inset-x-3 bottom-3 h-[min(92dvh,720px)] max-h-[calc(100dvh-1.5rem)]",
            "md:inset-auto md:right-6 md:bottom-6 md:h-[620px] md:w-[380px]",
          )}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <header className="flex items-center justify-between border-b border-ink/8 bg-paper px-4 py-3">
            <div>
              <p className="font-serif text-lg text-ink">Asistente ONAS</p>
              <p className="text-[10px] tracking-[0.16em] uppercase text-taupe">
                Consultas y turnos
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Reiniciar conversación"
                onClick={reset}
                className="cursor-pointer p-2 text-taupe transition-colors hover:text-ink"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                aria-label="Minimizar"
                onClick={() => setOpen(false)}
                className="cursor-pointer p-2 text-taupe transition-colors hover:text-ink"
              >
                <Minimize2 size={16} />
              </button>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                className="cursor-pointer p-2 text-taupe transition-colors hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {typing ? <TypingIndicator /> : null}
            {!typing ? (
              <QuickReplies replies={state.replies} onSelect={handleReply} />
            ) : null}
            {state.showForm && !typing ? (
              <BookingFlow onSubmit={handleDetails} />
            ) : null}
            {state.showWhatsApp && !typing ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-ink px-4 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ivory transition-colors hover:bg-accent"
              >
                Continuar por WhatsApp
              </a>
            ) : null}
            {state.flow === "location" && !typing ? (
              <a
                href={getMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex border border-ink/15 px-4 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                Cómo llegar
              </a>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-ink/8 bg-paper px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleText(draft);
            }}
          >
            <label htmlFor={formId} className="sr-only">
              Escribí tu consulta
            </label>
            <input
              id={formId}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-taupe/70"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="cursor-pointer bg-ink p-2 text-ivory transition-colors hover:bg-accent"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      ) : null}

      {!open ? (
        <div className="floating-fixed pointer-events-auto z-[60] flex items-center gap-3 right-5 bottom-5 md:right-6 md:bottom-6" style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Te ayudo"
            className="relative flex size-14 cursor-pointer items-center justify-center rounded-full bg-ink text-ivory shadow-[0_12px_40px_rgba(28,22,18,0.25)] transition-colors hover:bg-accent"
          >
            <span className="absolute right-full mr-3 whitespace-nowrap bg-ink px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase text-ivory shadow-[0_8px_24px_rgba(28,22,18,0.18)] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-ink">
              Te ayudo
            </span>
            <MessageCircle size={22} strokeWidth={1.6} />
          </button>
          <a
            href={integrations.whatsapp.launcherUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_rgba(28,22,18,0.25)] transition-transform hover:scale-105"
          >
            <WhatsAppIcon />
          </a>
        </div>
      ) : null}
    </>
  );
}
