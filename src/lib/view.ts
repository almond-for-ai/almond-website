export type View = "roasted" | "json" | "yaml";

export function getViewFromSearchParams(sp: {
  view?: string | string[];
}): View {
  const v = Array.isArray(sp.view) ? sp.view[0] : sp.view;
  if (v === "json" || v === "yaml") return v;
  return "roasted";
}
