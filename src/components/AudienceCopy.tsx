import type { ReactNode } from "react";

/**
 * Always renders the `solo` variant.
 * Audience toggle has been removed — Almond is a universal memory layer.
 * The `team` prop is accepted but unused, so no call sites need updating.
 */
type AudienceCopyAs = "div" | "p" | "h1" | "h2" | "h3" | "span";

export function AudienceCopy({
  solo,
  className,
  as: Tag = "div",
}: {
  solo: ReactNode;
  team?: ReactNode;
  className?: string;
  as?: AudienceCopyAs;
}) {
  return <Tag className={className}>{solo}</Tag>;
}
