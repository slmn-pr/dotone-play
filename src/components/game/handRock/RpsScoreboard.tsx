
import { Crown, Flame, Shield, Trophy } from "lucide-react";

type Props = {
  round: number;
  totalRounds: number;
  score: number;
  wins: number;
  losses: number;
  draws: number;
};

export function RpsScoreboard({
  round,
  totalRounds,
  score,
  wins,
  losses,
  draws,
}: Props) {
  const progress = (round / totalRounds) * 100;

  return (
    <section className="rounded-[26px] border border-white/10 bg-[#141d32] p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={<Trophy size={19} />}
          label="امتیاز مسابقه"
          value={score.toLocaleString("fa-IR")}
          color="text-amber-300"
        />
        <Stat
          icon={<Crown size={19} />}
          label="برد"
          value={wins.toLocaleString("fa-IR")}
          color="text-emerald-400"
        />
        <Stat
          icon={<Shield size={19} />}
          label="باخت"
          value={losses.toLocaleString("fa-IR")}
          color="text-rose-400"
        />
        <Stat
          icon={<Flame size={19} />}
          label="مساوی"
          value={draws.toLocaleString("fa-IR")}
          color="text-cyan-300"
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="font-bold text-white">
          پیشرفت مسابقه
        </span>
        <span className="text-slate-400">
          {round.toLocaleString("fa-IR")} از{" "}
          {totalRounds.toLocaleString("fa-IR")} راند
        </span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-l from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 flex gap-2" dir="ltr">
        {Array.from({ length: totalRounds }, (_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index < round
                ? "bg-violet-400"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.035] p-3 sm:p-4">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs text-slate-400">
          {label}
        </span>
      </div>

      <strong className="mt-3 block text-2xl font-black text-white">
        {value}
      </strong>
    </div>
  );
}
