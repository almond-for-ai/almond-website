import { CardFrame, type CardTone } from "@/components/cards/CardFrame";
import { Stagger, StaggerItem } from "@/components/Motion";

/**
 * Three deployment modes mapped to the pricing tiers. Where your memory lives,
 * tier by tier. Pure layout.
 */

type Mode = {
  mode: string;
  tier: string;
  where: string;
  points: string[];
  tone: CardTone;
  featured?: boolean;
};

const MODES: Mode[] = [
  {
    mode: "Managed",
    tier: "Single Almond",
    where: "Almond-managed infrastructure.",
    points: [
      "Zero setup, runs in minutes",
      "Encrypted in transit and at rest",
      "Private to your account",
    ],
    tone: "light",
  },
  {
    mode: "BYO cloud",
    tier: "Bunch",
    where: "Your own AWS, GCP, or Azure.",
    points: [
      "Memory never leaves your cloud",
      "Your keys, your region",
      "Managed MCP server",
    ],
    tone: "dark",
    featured: true,
  },
  {
    mode: "Self-host",
    tier: "Orchard",
    where: "Your infrastructure, even air-gapped.",
    points: [
      "Fully on-prem, no egress",
      "Custom retention policies",
      "On-prem MCP server",
    ],
    tone: "light",
  },
];

function ModeCard({ m }: { m: Mode }) {
  const dark = m.tone === "dark";
  const dot = dark ? "bg-walnut-300" : "bg-walnut-500";
  const tierColor = dark ? "text-white/55" : "text-black/50";
  const whereColor = dark ? "text-white/80" : "text-black/70";
  const pointColor = dark ? "text-white/75" : "text-black/70";

  return (
    <CardFrame tone={m.tone}>
      <div className="flex h-full flex-col gap-[16px] p-[28px] md:p-[32px]">
        <div>
          <div className="flex items-center gap-[10px]">
            <h3 className="font-sans text-[22px] font-medium leading-[28px] tracking-[-0.44px]">
              {m.mode}
            </h3>
            {m.featured ? (
              <span className="rounded-full bg-walnut-500 px-[8px] py-[2px] font-mono text-[9px] uppercase tracking-[0.16em] text-white">
                Popular
              </span>
            ) : null}
          </div>
          <p className={`mt-[4px] font-mono text-[11px] uppercase tracking-[0.16em] ${tierColor}`}>
            {m.tier}
          </p>
        </div>
        <p className={`text-[15px] leading-[22px] ${whereColor}`}>{m.where}</p>
        <ul className="mt-auto flex flex-col gap-[10px] pt-[8px]">
          {m.points.map((p) => (
            <li
              key={p}
              className={`flex items-start gap-[10px] text-[14px] leading-[21px] ${pointColor}`}
            >
              <span className={`mt-[7px] inline-block h-[6px] w-[6px] shrink-0 rounded-full ${dot}`} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </CardFrame>
  );
}

export function DeploymentMatrix() {
  return (
    <Stagger as="ul" className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
      {MODES.map((m) => (
        <StaggerItem key={m.mode} as="li">
          <ModeCard m={m} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
