"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
export function BottomNavigation() {
  const pathname = usePathname();
  const items = navigation.filter(x => ["/", "/games", "/missions", "/rewards", "/profile"].includes(x.href));
  return <nav aria-label="ناوبری موبایل" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/10 bg-[#0e162a]/95 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
    {items.map(({href,label,icon:Icon})=>{const active = href === "/" ? pathname === "/" : pathname.startsWith(href); return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-1 text-[10px] ${active ? "text-[#b9a8ff]" : "text-slate-400"}`}><Icon size={21}/><span>{label}</span></Link>})}
  </nav>;
}
