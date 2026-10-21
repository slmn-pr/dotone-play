import Link from "next/link";
export function Brand() {
  return <Link href="/" aria-label="مای دات پلی - صفحه اصلی" className="flex items-center gap-3">
    <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-2xl font-black text-[#111728] shadow-[0_0_32px_#fff2]">d.</span>
    <span className="flex flex-col"><strong className="text-lg leading-6 tracking-tight">مای دات <span className="text-[#a997ff]">پلی</span></strong><small className="text-[10px] tracking-[0.28em] text-slate-400">MYDOT PLAY</small></span>
  </Link>;
}
