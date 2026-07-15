"use client";

import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { AlmondGlyph } from "@/components/AlmondMark";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({
  source,
  className = "",
}: {
  source: "hero" | "footer" | "manifesto";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

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
        className={`flex items-center gap-[10px] rounded-full bg-black px-[20px] py-[13px] text-[15px] font-medium text-white ${className}`}
      >
        <AlmondGlyph size={14} />
        <span>You&rsquo;re in. We&rsquo;ll write when it&rsquo;s time.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`w-full max-w-[440px] ${className}`}>
      <div className="flex items-center gap-[8px] rounded-full border border-black/10 bg-white p-[6px] pl-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow focus-within:shadow-[0_2px_12px_rgba(123,64,25,0.10)]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
          disabled={status === "submitting"}
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
          className="btn-primary shrink-0 disabled:opacity-60"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Saving…" : "Save my seat"}
        </button>
      </div>
      {error ? (
        <p className="mt-[8px] pl-[20px] text-[13px] text-[#a33]">{error}</p>
      ) : (
        <p className="mt-[8px] pl-[20px] text-[13px] text-black/40">
          Be there when the shell cracks. No spam, ever.
        </p>
      )}
    </form>
  );
}
