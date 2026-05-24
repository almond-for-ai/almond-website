import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const RULES = [
  {
    title: "Tap matching pairs",
    desc: "Find the twin almonds.",
  },
  {
    title: "Beat the clock",
    desc: "Faster runs score higher.",
  },
  {
    title: "No misses allowed",
    desc: "Three strikes restart the board.",
  },
  {
    title: "Climb the streak",
    desc: "Daily reps build muscle memory.",
  },
];

export function MindGameSection() {
  return (
    <section id="game" className="w-full pb-[140px]">
      <div className="container-x">
        <Reveal y={32} duration={0.8}>
        <div className="relative w-full overflow-hidden rounded-[32px] bg-walnut-500">
          {/* Subtle top dark stripe (matches Figma "DarkLine") */}
          <div className="h-[12px] w-full bg-black/[0.04]" />

          {/* Header */}
          <div className="flex h-[267px] items-center">
            <div className="flex-1 px-[72px]">
              <h2 className="max-w-[420px] font-sans text-[32px] font-medium leading-[38.4px] tracking-[-0.64px]">
                <span className="text-white">Test your memory </span>
                <span className="text-white/70">with</span>
                <br />
                <span className="text-white/70">a mind game</span>
              </h2>
              <button
                type="button"
                className="btn-secondary mt-[28px]"
                disabled
              >
                Restart
              </button>
            </div>
          </div>

          {/* Game placeholder */}
          <div className="relative h-[540px] w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-white/15 px-4 py-2 text-[13px] font-medium text-white/90">
                Game coming soon
              </span>
            </div>
          </div>

          {/* Rules row */}
          <div className="relative w-full bg-black/[0.04] px-5 pb-[72px] pt-[48px]">
            <div className="absolute inset-x-0 top-0 h-px bg-walnut-400" />
            <Stagger
              as="div"
              className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-[20px] gap-y-[32px] sm:grid-cols-2 lg:grid-cols-4"
            >
              {RULES.map((r, i) => (
                <StaggerItem key={i} className="flex flex-col gap-[6px]">
                  <div className="flex items-start gap-[8px]">
                    <CheckMark />
                    <div className="text-[18px] font-medium leading-[21.6px] tracking-[-0.36px] text-white">
                      {r.title}
                    </div>
                  </div>
                  <div className="pl-[26px] text-[15px] font-medium leading-[21px] tracking-[-0.3px] text-white/70">
                    {r.desc}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="mt-[2px] shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="white" />
      <path
        d="M5 9.2l2.8 2.8L13 6.8"
        stroke="#7B4019"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
