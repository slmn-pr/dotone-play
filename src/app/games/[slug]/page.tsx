import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { RockPaperScissors } from "@/components/game/RockPaperScissors";
import { StarClickGame } from "@/components/game/StarClickGame";
import { DartsGame } from "@/components/game/DartsGame";
import { AimTrainerGame } from "@/components/game/AimTrainerGame";

const availableGames = {
  "rock-paper-scissors": {
    title: "سنگ، کاغذ، قیچی",
    description: "با کامپیوتر رقابت کن و امتیاز بگیر.",
    component: RockPaperScissors,
  },
  "star-click": {
    title: "شکار ستاره",
    description: "در زمان محدود ستاره‌های بیشتری شکار کن.",
    component: StarClickGame,
  },
  darts: {
    title: "پرتاب دارت",
    description: "مرکز هدف رو پیدا کن و رکورد بزن.",
    component: DartsGame,
  },
  "aim-trainer": {
    title: "نشونه‌گیری",
    description: "به هدف‌های متحرک شلیک کن.",
    component: AimTrainerGame,
  },
};

type GameSlug = keyof typeof availableGames;

export default async function GameDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = availableGames[slug as GameSlug];

  if (!game) {
    return (
      <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#141d32] p-8 text-center">
        <Gamepad2 className="mx-auto text-violet-300" size={52} />
        <h1 className="mt-5 text-2xl font-black">این بازی هنوز فعال نشده</h1>
        <Link
          href="/games"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3"
        >
          <ArrowRight size={17} />
          بازگشت به بازی‌ها
        </Link>
      </section>
    );
  }

  const GameComponent = game.component;

  return (
    <main className="space-y-7">
      <div>
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowRight size={17} />
          مرکز بازی‌ها
        </Link>

        <h1 className="mt-5 text-3xl font-black sm:text-4xl">{game.title}</h1>

        <p className="mt-3 text-sm text-slate-400">{game.description}</p>
      </div>

      <GameComponent />
    </main>
  );
}
