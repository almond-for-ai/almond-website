/** Anam-aligned motion tokens (Framer-style: snappy reveals, quiet hovers). */

export const MOTION_EASE = {
  reveal: [0.22, 1, 0.36, 1] as const,
  hover: [0.44, 0, 0.56, 1] as const,
};

export const MOTION_DURATION = {
  micro: 0.2,
  enter: 0.5,
  mount: 0.5,
  tab: 0.35,
  orbit: 30,
} as const;

export const MOTION_STAGGER = 0.06;

export const MOTION_VIEWPORT = {
  once: true,
  margin: "-10% 0px" as const,
};
