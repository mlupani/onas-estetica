import type { QuickReply } from "@/lib/chat-engine";

export function QuickReplies({
  replies,
  onSelect,
  disabled,
}: {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
  disabled?: boolean;
}) {
  if (replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply)}
          className="cursor-pointer border border-ink/15 bg-ivory px-3 py-2 text-left text-[12px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
