import Link from "next/link";
import { ArrowLeft, Gift, Sparkles, Trophy } from "lucide-react";
export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden rounded-[32px] border border-[#9b82ff]/25 bg-gradient-to-l from-[#28235c] via-[#1c2751] to-[#0d4657] p-6 sm:p-10 lg:p-12">
      <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 size-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-[#dbd5ff]">
          <Sparkles size={15} /> دنیای بازی و پاداش مای دات
        </span>
        <h1 className="mt-6 text-3xl font-black leading-[1.7] sm:text-4xl lg:text-[46px]">
          بازی کن،{" "}
          <span className="text-[#b8a7ff]">جایزه ببر!</span>
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-8 text-[#cdd5ed] sm:text-base">
          یه دنیای تازه از بازی‌های کوتاه، چالش‌های روزانه و جایزه‌های جذاب. هر
          امتیاز، یه قدم نزدیک‌تر به جایزه بعدیه.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-[#252149] transition hover:bg-[#e2dbff]"
          >
            شروع بازی <ArrowLeft size={17} />
          </Link>
          <Link
            href="/missions"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
          >
            مأموریت‌های امروز <Gift size={17} />
          </Link>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-6 hidden rotate-[-13deg] rounded-[36px] border border-white/15 bg-white/10 p-10 text-8xl shadow-2xl backdrop-blur-md xl:block"
      >
        🎮
      </div>
      <Trophy
        aria-hidden="true"
        className="absolute left-8 top-8 text-yellow-300/40"
        size={39}
      />
    </section>
  );
}
