import { games } from "@/data/games";
import { GameCard } from "@/components/ui/GameCard";
export default function GamesPage(){return <div className="space-y-5"><div><h1 className="text-3xl font-black">مرکز بازی‌ها 🎮</h1><p className="mt-3 text-slate-400">بازی‌های این بخش در مرحله بعد فعال می‌شوند.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{games.map(game=><GameCard key={game.href} {...game}/>)}</div></div>}
