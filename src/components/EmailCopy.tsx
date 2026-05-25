"use client";

import { useState } from "react";

type Props = {
  email: string;
  className?: string;
  label?: string;
};

export function EmailCopy({ email, className, label = "Email" }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for browsers without clipboard API
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // Last resort: do nothing visible
      }
      document.body.removeChild(ta);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Copy email address ${email}`}
      className={className}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
