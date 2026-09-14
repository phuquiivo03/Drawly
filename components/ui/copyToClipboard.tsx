"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyToClipboardProps {
  text: string;
  className?: string;
}

export function CopyToClipboard({ text, className }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-label={copied ? "Copied" : "Copy"}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}
