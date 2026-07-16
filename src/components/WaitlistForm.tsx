"use client";

import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { AlmondGlyph } from "@/components/AlmondMark";

type Status = "idle" | "submitting" | "success" | "error";
type Variant = "light" | "dark";

export function WaitlistForm({
  source,
  variant = "light",
  className = "",
}: {
  source: "hero" | "footer" | "manifesto";
  variant?: Variant;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const dark = variant === "dark";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("success");
        sendGAEvent("event", "waitlist_signup", { source });
      } else {
        setStatus("error");
        setError(
          data.error === "invalid_email"
            ? "That email doesn't look right."
            : data.error === "slow_down"
              ? "Too many tries. Give it a few minutes."
              : "Something slipped. Try again.",
        );
      }
    } catch {
      setStatus("error");
      setError("Something slipped. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`inline-flex h-[48px] items-center gap-[10px] rounded-full px-[24px] text-[15px] font-medium ${
          dark ? "bg-white text-black" : "bg-black text-white"
        } ${className}`}
      >
        <AlmondGlyph size={14} />
        <span>You&rsquo;re in. We&rsquo;ll write when it&rsquo;s time.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`w-full max-w-[460px] ${className}`}>
      <div className="flex flex-wrap gap-[8px]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          aria-label="Email address"
          disabled={status === "submitting"}
          className={`h-[48px] min-w-[210px] flex-1 rounded-full border px-[22px] text-[15px] outline-none transition-shadow ${
            dark
              ? "border-white/15 bg-white/[0.08] text-white placeholder:text-white/40 focus:border-white/30 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
              : "border-black/10 bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] placeholder:text-black/35 focus:border-black/20 focus:shadow-[0_2px_12px_rgba(123,64,25,0.10)]"
          }`}
        />
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`h-[48px] shrink-0 grow rounded-full px-[24px] text-[15px] font-medium tracking-[-0.3px] transition-[opacity,transform] duration-200 active:scale-[0.98] disabled:opacity-60 sm:grow-0 ${
            dark
              ? "bg-white text-black hover:opacity-90"
              : "bg-black text-white hover:opacity-88"
          }`}
        >
          {status === "submitting" ? "Saving…" : "Save my seat"}
        </button>
      </div>
      <p
        className={`mt-[10px] pl-[22px] text-[13px] leading-[18px] ${
          error
            ? dark
              ? "text-[#f2b8b5]"
              : "text-[#a33]"
            : dark
              ? "text-white/45"
              : "text-black/40"
        }`}
      >
        {error ?? "Be there when the shell cracks. No spam, ever."}
      </p>
    </form>
  );
}
