"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { BoardCanvas } from "@/components/board/BoardCanvas";
import { WordReveal } from "@/components/WordReveal";

/**
 * Pinned board scene — the multiplayer moment on the home page.
 *
 * Scroll assembles it: an empty canvas, then cards arriving from off the edges,
 * then threads pulling them into one belief, then other people's cursors. Past
 * ~70% the board goes live and you can push it around yourself. The copy never
 * names the feature; the board is the argument.
 *
 * Reduced motion: no pin, no scrub — an assembled, immediately playable board.
 */

const EYEBROW = "Something next to it";
const TITLE = "Several minds. One memory.";
const SUB = "Almond remembers for you. This one remembers for the room.";

export function BoardScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const backgroundColor = useTransform(
    smooth,
    [0, 0.14, 0.86, 1],
    ["#ffffff", "#f5f2ee", "#f5f2ee", "#ffffff"],
  );
  const halftoneOpacity = useTransform(smooth, [0, 0.14, 0.86, 1], [0, 1, 1, 0]);
  const headOpacity = useTransform(smooth, [0.02, 0.14], [0, 1]);
  const headY = useTransform(smooth, [0.02, 0.14], [12, 0]);
  const frameOpacity = useTransform(smooth, [0.04, 0.16], [0, 1]);
  const frameScale = useTransform(smooth, [0.04, 0.3], [0.97, 1]);
  const tailOpacity = useTransform(smooth, [0.6, 0.72], [0, 1]);

  const head = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/35">
        {EYEBROW}
      </span>
      <WordReveal
        as="h2"
        inView
        text={TITLE}
        className="mt-[10px] font-display text-[30px] font-normal leading-[1.08] tracking-[-0.02em] text-black md:text-[42px]"
      />
      <p className="mt-[10px] max-w-[420px] text-[14px] leading-[21px] text-black/45 md:text-[15px] md:leading-[23px]">
        {SUB}
      </p>
    </>
  );

  const tail = (
    <Link
      href="/grove"
      className="mt-[16px] inline-block text-[13px] tracking-[0.01em] text-[#7b4019] underline underline-offset-4 transition-opacity hover:opacity-70 md:text-[14px]"
    >
      Get the whole board &rarr;
    </Link>
  );

  if (reduce) {
    return (
      <section id="board" className="w-full pb-[100px] md:pb-[140px]">
        <div className="container-x">
          <div className="text-center">{head}</div>
          <BoardCanvas className="mt-[28px]" />
          <div className="text-center">{tail}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="board" ref={ref} className="relative h-[220vh] w-full md:h-[260vh]">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-svh w-full flex-col items-center justify-center overflow-clip"
      >
        <motion.div
          aria-hidden
          className="halftone-bg absolute inset-0"
          style={{ opacity: halftoneOpacity }}
        />

        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="relative px-[24px] text-center"
        >
          {head}
        </motion.div>

        <motion.div
          style={{ opacity: frameOpacity, scale: frameScale }}
          className="relative mt-[18px] w-[min(92vw,calc((100svh-340px)*1.11))] max-w-[1000px] md:mt-[22px] md:w-[min(92vw,calc((100svh-330px)*1.6))]"
        >
          <BoardCanvas progress={smooth} />
        </motion.div>

        <motion.div
          style={{ opacity: tailOpacity }}
          className="relative text-center"
        >
          {tail}
        </motion.div>
      </motion.div>
    </section>
  );
}
