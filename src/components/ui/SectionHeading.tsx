import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export function SectionHeading({title,subtitle,href}:{title:string;subtitle?:string;href?:string}) {
 return <div className="mb-5 flex items-end justify-between gap-3"><div><h2 className="text-xl font-black sm:text-2xl">{title}</h2>{subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}</div>{href && <Link href={href} className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-[#b8a7ff] hover:text-white">مشاهده همه <ArrowLeft size={15}/></Link>}</div>
}
