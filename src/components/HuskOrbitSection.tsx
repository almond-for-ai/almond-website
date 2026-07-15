import { HuskOrbit } from "@/components/HuskOrbit";
import { Reveal } from "@/components/Motion";

export function HuskOrbitSection() {
  return (
    <section className="w-full pb-[80px] pt-[24px]">
      <div className="container-x">
        <Reveal y={24} duration={0.9}>
          <div className="capsule-50 relative bg-[#f5f2ee] px-[24px] pb-[48px] pt-[56px] md:px-[64px]">
            <div className="halftone-bg absolute inset-0" aria-hidden />
            <div className="relative mx-auto max-w-[520px]">
              <HuskOrbit />
            </div>
            <p className="relative mt-[20px] text-center text-[13px] tracking-[0.02em] text-black/40">
              Press and hold the almond. That&rsquo;s all we can show you for now.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
