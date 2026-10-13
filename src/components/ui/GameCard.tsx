
import Link from "next/link";
import { ArrowUpLeft, LockKeyhole, Play } from "lucide-react";

export type GameCardProps = {
  title: string;
  category: string;
  description: string;
  icon: string;
  gradient: string;
  href: string;
  status?: string;
};

export function GameCard({
  title, category, description, icon, gradient, href, status,
}: GameCardProps) {
  const active = status === "فعال";

  const content = (
    <>
      <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="absolute -left-10 -top-20 size-48 rounded-full border-[32px] border-white/10" />
        <div className="absolute -right-10 -bottom-20 size-48 rounded-full border-[32px] border-white/10" />

        <span className="relative text-7xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-125">
          {icon}
        </span>

        <span className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md ${
          active
            ? "bg-emerald-400/20 text-emerald-100"
            : "bg-black/30 text-white"
        }`}>
          {status ?? category}
        </span>
      </div>

      <div className="p-5">
        <span className="text-xs font-bold text-violet-300">
          {category}
        </span>

        <div className="mt-2 flex items-center justify-between gap-3">
          <h3 className="text-lg font-black">{title}</h3>
          <ArrowUpLeft size={20} className="text-slate-400" />
        </div>

        <p className="mt-3 min-h-12 text-sm leading-7 text-slate-400">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className={`flex items-center gap-2 text-sm font-bold ${
            active ? "text-white" : "text-slate-500"
          }`}>
            {active ? <Play size={17} /> : <LockKeyhole size={17} />}
            {active ? "شروع بازی" : "به‌زودی"}
          </span>
          {active && (
            <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
              کسب امتیاز
            </span>
          )}
        </div>
      </div>
    </>
  );

  const classes =
    "group min-w-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#141d32] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_20px_50px_#0005]";

  return active ? (
    <Link href={href} className={classes}>{content}</Link>
  ) : (
    <article className={`${classes} opacity-75`}>{content}</article>
  );
}
