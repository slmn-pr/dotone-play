
"use client";

import { Coins, Gift, Medal } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

export function RewardSummary() {
  const {
    points,
    completedMissions,
    transactions,
    isHydrated,
  } = useGame();

  const stats = [
    {
      label: "امتیاز فعلی",
      value: points.toLocaleString("fa-IR"),
      hint: "موجودی نمایشی",
      icon: Coins,
      color: "text-amber-300",
    },
    {
      label: "مأموریت‌های کامل",
      value: completedMissions.length.toLocaleString("fa-IR"),
      hint: "مأموریت‌های تأییدشده",
      icon: Medal,
      color: "text-violet-300",
    },
    {
      label: "پاداش‌های دریافت‌شده",
      value: transactions.length.toLocaleString("fa-IR"),
      hint: "تعداد تراکنش‌های امتیازی",
      icon: Gift,
      color: "text-cyan-300",
    },
  ];

  return (
    <section
      aria-label="خلاصه پیشرفت کاربر"
      className="grid gap-3 sm:grid-cols-3"
    >
      {stats.map(({ label, value, hint, icon: Icon, color }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-3xl border border-white/10 bg-[#141d32]/85 p-5"
        >
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 ${color}`}>
            <Icon size={24} />
          </div>

          <div>
            <p className="text-xs text-slate-400">{label}</p>
            <strong className="mt-1 block text-2xl font-black">
              {isHydrated ? value : "—"}
            </strong>
            <small className="text-[11px] text-slate-500">
              {hint}
            </small>
          </div>
        </div>
      ))}
    </section>
  );
}
