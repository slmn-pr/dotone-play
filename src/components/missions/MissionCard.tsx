
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  type LucideIcon,
} from "lucide-react";

type MissionCardProps = {
  title: string;
  description: string;
  points: number;
  icon: LucideIcon;
  completed?: boolean;
  available?: boolean;
  href?: string;
  category: string;
};

export function MissionCard({
  title,
  description,
  points,
  icon: Icon,
  completed = false,
  available = true,
  href,
  category,
}: MissionCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#141d32] p-5 transition-all duration-300 hover:border-violet-400/30 sm:p-6">
      <div className="absolute -left-16 -top-16 size-36 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
          <Icon size={27} />
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-sm font-bold text-amber-300">
            +{points.toLocaleString("fa-IR")} امتیاز
          </span>

          {completed && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <CheckCircle2 size={14} />
              تکمیل شده
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-5">
        <span className="text-xs text-slate-500">{category}</span>

        <h3 className="mt-2 text-lg font-black">{title}</h3>

        <p className="mt-3 min-h-12 text-sm leading-7 text-slate-400">
          {description}
        </p>

        <div className="mt-5 border-t border-white/10 pt-4">
          {completed ? (
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <CheckCircle2 size={18} />
              پاداش دریافت شد
            </div>
          ) : available && href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
            >
              شروع مأموریت
              <ArrowLeft size={17} />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <LockKeyhole size={17} />
              به‌زودی
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
