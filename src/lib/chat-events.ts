export const OPEN_CHAT_EVENT = "onas:open-chat";

export type ChatIntent =
  | "booking"
  | "treatments"
  | "prices"
  | "location"
  | "query";

export type OpenChatDetail = {
  intent?: ChatIntent;
  treatment?: string;
};

export function openChat(detail: OpenChatDetail = {}) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail }));
}
