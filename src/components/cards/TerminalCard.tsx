"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { CardFrame } from "@/components/cards/CardFrame";
import { CARD_EASE, CARD_ENTER_MS } from "@/components/cards/motion";

export function TerminalCard({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <CardFrame tone="dark">
      <div ref={ref} className="flex h-full flex-col gap-[16px] p-[20px] md:p-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <span className="h-[10px] w-[10px] rounded-full bg-white/12" />
            <span className="h-[10px] w-[10px] rounded-full bg-white/12" />
            <span className="h-[10px] w-[10px] rounded-full bg-white/12" />
          </div>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-[10px] py-[3px] font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 transition-[color,border-color,background-color] duration-500 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80 focus-visible:text-white/80"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="flex-1 font-mono text-[12.5px] leading-[20px] tracking-[-0.005em] text-white/85">
          {lines.map((srcLine, i) => {
            const isPrompt = srcLine.startsWith(">");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{
                  duration: CARD_ENTER_MS,
                  delay: i * 0.1,
                  ease: CARD_EASE,
                }}
                className="whitespace-pre"
              >
                <span className={isPrompt ? "text-walnut-300" : "text-white/80"}>
                  {srcLine}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center gap-[8px] pt-[6px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            on-prem
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            one command
          </span>
        </div>
      </div>
    </CardFrame>
  );
}
