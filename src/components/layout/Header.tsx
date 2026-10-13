
"use client";

import Link from "next/link";
import { Bell, Coins, UserRound } from "lucide-react";

import { Brand } from "./Brand";
import { useGame } from "@/contexts/GameContext";

export function Header() {
  const { profile, points, isHydrated } = useGame();

  return (
    <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-white/10 bg-[#090e1c]/85 px-4 backdrop-blur-xl sm:px-8">
      <div className="lg:hidden">
        <Brand />
      </div>

      <div className="hidden lg:block">
        <p className="text-sm font-bold">
          خوش اومدی،{" "}
          {isHydrated
            ? profile.fullName.split(" ")[0] || "بازیکن"
            : "بازیکن"}
          ! 👋
        </p>
        <p className="mt-1 text-xs text-slate-400">
          امروز وقت یه برد جدیده
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/wallet"
          className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300"
        >
          <Coins size={17} />
          {isHydrated ? points.toLocaleString("fa-IR") : "—"}
        </Link>

        <button
          type="button"
          disabled
          aria-label="اعلان‌ها به‌زودی"
          title="اعلان‌ها به‌زودی"
          className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 opacity-60"
        >
          <Bell size={18} />
        </button>

        <Link
          href="/profile"
          aria-label="پروفایل من"
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#7863e4] to-[#20bdd0]"
        >
          <UserRound size={21} />
        </Link>
      </div>
    </header>
  );
}
