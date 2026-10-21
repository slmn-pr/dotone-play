import { HeroSection } from "@/components/home/HeroSection";
import { RewardSummary } from "@/components/home/RewardSummary";
import { DailyMissions } from "@/components/home/DailyMissions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GameCard } from "@/components/ui/GameCard";
import { games } from "@/data/games";
import { Sparkles } from "lucide-react";
export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <RewardSummary />
      <section>
        <SectionHeading
          title="بازی‌های محبوب"
          subtitle="یه چالش انتخاب کن و آماده رقابت شو"
          href="/games"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <DailyMissions />
        <section className="flex flex-col justify-between overflow-hidden rounded-[28px] border border-cyan-300/15 bg-gradient-to-br from-[#17364d] to-[#1a1d3d] p-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Sparkles size={16} /> مخصوص اعضای دات‌وان
            </span>
            <h2 className="mt-5 text-2xl font-black leading-relaxed">
              هر روز برگرد،
              <br />
              یه قدم جلوتر باش!
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              چالش‌های روزانه رو ببین و امتیازهای بیشتری جمع کن. سیستم پاداش
              واقعی در نسخه اصلی فعال خواهد شد.
            </p>
          </div>
          <div className="mt-7 text-6xl">🎁</div>
        </section>
      </div>
    </div>
  );
}
