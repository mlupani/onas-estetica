"use client";

import { Button } from "@/components/ui/Button";
import { openChat, type ChatIntent } from "@/lib/chat-events";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "light" | "accent";
  intent?: ChatIntent;
  treatment?: string;
  ariaLabel?: string;
};

export function OpenChatButton({
  children,
  className,
  variant = "primary",
  intent = "booking",
  treatment,
  ariaLabel,
}: Props) {
  return (
    <Button
      variant={variant}
      className={className}
      ariaLabel={ariaLabel}
      onClick={() => openChat({ intent, treatment })}
    >
      {children}
    </Button>
  );
}
