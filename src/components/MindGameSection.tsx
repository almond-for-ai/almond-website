import { MindGame } from "@/components/MindGame";
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
    <section id="game" className="w-full pb-[100px] md:pb-[140px]">
      <div className="container-x">
        <Reveal y={32} duration={0.8}>
          <div className="relative w-full overflow-hidden rounded-[24px] bg-walnut-500 md:rounded-[32px]">
            {/* Top accent bar */}
            <div className="h-[10px] w-full bg-black/[0.05]" />

            {/* Header */}
            <div className="flex items-center px-6 py-10 md:min-h-[267px] md:px-[72px] md:py-0">
              <div className="flex-1">
                <h2 className="max-w-[420px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.56px] text-white md:text-[32px] md:leading-[38px] md:tracking-[-0.64px]">
                  <span>Test your memory </span>
                  <span className="text-white/70">with</span>
                  <br />
                  <span className="text-white/70">a mind game</span>
                </h2>
              </div>
            </div>

            {/* Game */}
            <div className="relative h-[560px] w-full md:h-[620px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
              <MindGame />
            </div>

            {/* Rules row */}
            <div className="relative w-full bg-black/[0.04] px-6 pb-10 pt-8 md:px-5 md:pb-[72px] md:pt-[48px]">
              <div className="absolute inset-x-0 top-0 h-px bg-walnut-400" />
              <Stagger
                as="div"
                className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-[20px] gap-y-[24px] sm:grid-cols-2 md:gap-y-[32px] lg:grid-cols-4"
              >
                {RULES.map((r, i) => (
                  <StaggerItem key={i} className="flex flex-col gap-[6px]">
                    <div className="flex items-start gap-[8px]">
                      <CheckMark />
                      <div className="text-[16px] font-medium leading-[20px] tracking-[-0.32px] text-white md:text-[18px] md:leading-[21.6px] md:tracking-[-0.36px]">
                        {r.title}
                      </div>
                    </div>
                    <div className="pl-[26px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-white/70 md:text-[15px] md:leading-[21px] md:tracking-[-0.3px]">
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
