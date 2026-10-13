"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { Brand } from "./Brand";
import { Sparkles } from "lucide-react";
export function Sidebar() {
  const pathname = usePathname();
  return <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 flex-col border-l border-white/10 bg-[#0b1223]/80 px-4 py-7 backdrop-blur-xl lg:flex">
    <div className="px-3"><Brand /></div>
    <div className="mb-3 mt-12 px-4 text-[11px] font-bold tracking-wide text-slate-500">منوی اصلی</div>
    <nav aria-label="منوی اصلی" className="flex flex-col gap-1">
      {navigation.map(({href,label,icon:Icon}) => {const active = href === "/" ? pathname === "/" : pathname.startsWith(href); return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-white/10 ${active ? "bg-[#8066ec]/20 font-bold text-[#bcb0ff] ring-1 ring-[#9d86ff]/20" : "text-slate-400"}`}><Icon size={19}/>{label}</Link>})}
    </nav>
    <div className="mt-auto rounded-3xl border border-[#9078ff]/20 bg-gradient-to-br from-[#3c326b] to-[#151c36] p-4">
      <Sparkles className="mb-3 text-[#c9bbff]" size={22}/><strong className="text-sm">هر روز یک چالش جدید!</strong><p className="mt-2 text-xs leading-6 text-slate-300">بازی کن، امتیاز بگیر و مأموریت‌های جدید رو کشف کن.</p>
    </div>
  </aside>;
}
