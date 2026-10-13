import Link from "next/link";
import { ArrowUpLeft, Play } from "lucide-react";
export type GameCardProps = {title:string;category:string;description:string;icon:string;gradient:string;href:string;status?:string};
export function GameCard({title,category,description,icon,gradient,href,status}: GameCardProps) {
 return <Link href={href} className="group min-w-0 overflow-hidden rounded-[26px] border border-white/10 bg-[#151e33] transition duration-300 hover:-translate-y-1 hover:border-[#9f8cff]/50 hover:shadow-[0_18px_60px_#0004]">
  <div className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}><span aria-hidden="true" className="absolute -left-6 -top-12 size-44 rounded-full border-[28px] border-white/10"/><span aria-hidden="true" className="text-7xl drop-shadow-[0_14px_16px_#0006] transition duration-300 group-hover:scale-110">{icon}</span><span className="absolute right-4 top-4 rounded-full bg-black/25 px-3 py-1 text-[11px] text-white backdrop-blur">{status ?? category}</span></div>
  <div className="p-5"><div className="flex items-start justify-between gap-2"><h3 className="text-base font-bold">{title}</h3><ArrowUpLeft size={18} className="text-slate-400 transition group-hover:text-white"/></div><p className="mt-2 min-h-10 text-xs leading-6 text-slate-400">{description}</p><div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-xs text-[#beb0ff]">{category}</span><span className="flex items-center gap-1.5 text-xs font-bold text-white"><Play size={13} fill="currentColor"/> ورود به بازی</span></div></div>
 </Link>;
}
