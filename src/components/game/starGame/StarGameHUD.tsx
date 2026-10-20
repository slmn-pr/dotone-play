
import { Flame, Star, Timer, Trophy } from "lucide-react";

type Props = {
  score: number;
  timeLeft: number;
  duration: number;
  combo: number;
  bestCombo: number;
};

export function StarGameHUD({
  score,
  timeLeft,
  duration,
  combo,
  bestCombo,
}: Props) {
  const progress = Math.max(
    0,
    Math.min(100, (timeLeft / duration) * 100)
  );

  return (
    <div className="rounded-[26px] border border-white/10 bg-[#141d32] p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <HudItem
          icon={<Trophy size={20} />}
          label="امتیاز"
          value={score.toLocaleString("fa-IR")}
          color="text-amber-300"
        />
        <HudItem
          icon={<Timer size={20} />}
          label="زمان"
          value={`${Math.ceil(timeLeft).toLocaleString("fa-IR")}s`}
          color={timeLeft <= 5 ? "text-rose-400" : "text-cyan-300"}
        />
        <HudItem
          icon={<Flame size={20} />}
          label="Combo"
          value={`×${combo.toLocaleString("fa-IR")}`}
          color="text-orange-300"
        />
      </div>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-[width] duration-100 ${
            timeLeft <= 5
              ? "bg-gradient-to-l from-rose-500 to-orange-400"
              : "bg-gradient-to-l from-violet-500 to-cyan-400"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Star size={13} className="text-amber-300" />
          بهترین زنجیره: {bestCombo.toLocaleString("fa-IR")}
        </span>
        <span>
          {timeLeft <= 5 && timeLeft > 0
            ? "وقت داره تموم می‌شه!"
            : "ستاره‌ها رو سریع شکار کن"}
        </span>
      </div>
    </div>
  );
}

function HudItem({
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
        <span className="text-xs text-slate-400">{label}</span>
      </div>

      <strong className="mt-3 block text-xl font-black text-white sm:text-3xl">
        {value}
      </strong>
    </div>
  );
}
