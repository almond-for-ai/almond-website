"use client";

export type Audience = "solo" | "team";

// Audience toggle removed — Almond is presented as a universal memory layer.
// Always returns "solo" so all AudienceCopy sites render their solo variant.
export const useAudience = (_selector?: (s: { audience: Audience; setAudience: (a: Audience) => void }) => unknown) => {
  const state = { audience: "solo" as Audience, setAudience: () => {} };
  if (typeof _selector === "function") return _selector(state);
  return state;
};
