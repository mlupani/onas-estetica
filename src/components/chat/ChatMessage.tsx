import { cn } from "@/lib/cn";
import type { ChatMessage as ChatMessageType } from "@/lib/chat-engine";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("chat-bubble flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-ink text-ivory"
            : "bg-cream text-ink",
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
