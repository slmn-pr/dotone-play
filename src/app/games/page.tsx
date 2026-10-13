import { Gamepad2, Sparkles, Trophy } from "lucide-react";
import { GameCard } from "@/components/ui/GameCard";
import { games } from "@/data/games";

export default function GamesPage() {
  const available = games.filter((game) => game.status === "فعال");
  const upcoming = games.filter((game) => game.status !== "فعال");

  return (
    <main className="space-y-9">
      <section className="relative overflow-hidden rounded-[30px] border border-violet-400/20 bg-gradient-to-l from-[#2a2053] via-[#171e3b] to-[#10283b] p-6 sm:p-10">
        <div className="absolute -left-12 -top-20 size-64 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-violet-200">
            <Gamepad2 size={17} /> DotOne Gaming Arena
          </span>

          <h1 className="mt-6 text-3xl font-black sm:text-5xl">
            وقت بازیه! 🎮
          </h1>

          <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
            بازی مورد علاقه‌ات رو انتخاب کن، رکورد بزن و امتیاز جمع کن. هر بازی
            یک چالش جدید و یک فرصت برای بردنه!
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs">
              <Trophy size={18} className="text-amber-300" />
              امتیاز براساس عملکرد
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs">
              <Sparkles size={18} className="text-violet-300" />
              بازی‌های تعاملی
            </span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-black">🔥 بازی‌های فعال</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {available.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-black">🚀 به‌زودی</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>
    </main>
  );
}
