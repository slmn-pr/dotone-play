
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDot,
  UserRound,
} from "lucide-react";

import { useGame } from "@/contexts/GameContext";

export function DailyMissions() {
  const { completedMissions, isHydrated } = useGame();

  const profileCompleted =
    completedMissions.includes("complete-profile");

  const missions = [
    {
      icon: UserRound,
      name: "تکمیل پروفایل",
      detail: "اطلاعات حساب رو کامل کن",
      points: 150,
      completed: profileCompleted,
    },
    {
      icon: CircleDot,
      name: "اولین بازی",
      detail: "به‌زودی فعال می‌شود",
      points: 100,
      completed: false,
    },
  ];

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#141d32]/85 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-black">
          🎯 مأموریت‌های پیشنهادی
        </h2>

        <Link
          href="/missions"
          className="flex items-center gap-1 text-xs text-violet-300"
        >
          همه مأموریت‌ها
          <ArrowLeft size={15} />
        </Link>
      </div>

      <div className="space-y-3">
        {missions.map(({ icon: Icon, name, detail, points, completed }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.035] p-3"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              {completed && isHydrated ? (
                <CheckCircle2 size={20} />
              ) : (
                <Icon size={19} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{name}</p>
              <p className="mt-1 text-xs text-slate-400">
                {completed && isHydrated
                  ? "انجام شده"
                  : detail}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-bold ${
                completed && isHydrated
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-amber-400/10 text-amber-300"
              }`}
            >
              +{points.toLocaleString("fa-IR")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
