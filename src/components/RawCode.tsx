"use client";

import { AnimatePresence, motion } from "motion/react";

export function RawCode({
  format,
  content,
}: {
  format: "json" | "yaml";
  content: string;
}) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.pre
          key={format}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono overflow-x-auto rounded-[24px] border border-black/[0.08] bg-[#0e0e0e] p-6 text-[12px] leading-[18px] text-white md:p-8 md:text-[13px]"
        >
          <code>{content}</code>
        </motion.pre>
      </AnimatePresence>
    </div>
  );
}
