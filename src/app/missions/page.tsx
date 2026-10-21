
"use client";

import {
  CheckCircle2,
  Gamepad2,
  Gift,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from "lucide-react";

import { useGame } from "@/contexts/GameContext";
import { MissionCard } from "@/components/missions/MissionCard";

export default function MissionsPage() {
  const {
    points,
    completedMissions,
    isHydrated,
    isProfileComplete,
  } = useGame();

  const profileCompleted =
    completedMissions.includes("complete-profile");

  const missions = [
    {
      id: "complete-profile",
      title: "تکمیل پروفایل",
      description:
        "اطلاعات حساب کاربری خودت رو تکمیل کن و اولین جایزه مای دات پلی رو دریافت کن.",
      points: 150,
      icon: UserRound,
      completed: profileCompleted,
      available: true,
      href: "/profile",
      category: "مأموریت شروع",
    },
    {
      id: "first-game",
      title: "اولین بازی",
      description:
        "اولین بازی خودت رو انجام بده و امتیاز کسب کن.",
      points: 100,
      icon: Gamepad2,
      completed: false,
      available: false,
      category: "بازی و سرگرمی",
    },
    {
      id: "daily-challenge",
      title: "چالش روزانه",
      description:
        "هر روز به مای دات پلی سر بزن و در چالش‌ها شرکت کن.",
      points: 200,
      icon: Zap,
      completed: false,
      available: false,
      category: "چالش روزانه",
    },
    {
      id: "brand-mission",
      title: "آشنایی با مای دات",
      description:
        "با محصولات و خدمات اکوسیستم دات‌وان آشنا شو.",
      points: 250,
      icon: Sparkles,
      completed: false,
      available: false,
      category: "مأموریت تعاملی",
    },
  ];

  const completedCount = profileCompleted ? 1 : 0;
  const progress = (completedCount / missions.length) * 100;

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[30px] border border-violet-400/20 bg-gradient-to-br from-[#24204c] via-[#171d39] to-[#112b40] p-6 sm:p-9">
        <div className="absolute -left-16 -top-20 size-64 rounded-full bg-violet-500/15 blur-[70px]" />

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-2 text-xs font-bold text-violet-200">
              <Target size={16} />
              مرکز مأموریت‌های مای دات
            </span>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              مأموریت انجام بده،
              <span className="block pt-2 text-violet-300">
                امتیاز بگیر!
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-8 text-slate-300">
              مأموریت‌های مختلف رو انجام بده، امتیاز جمع کن و
              برای دریافت پاداش‌های بیشتر آماده شو.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-72">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Gift className="mb-3 text-amber-300" size={25} />
              <strong className="block text-2xl font-black">
                {isHydrated ? points.toLocaleString("fa-IR") : "—"}
              </strong>
              <span className="text-xs text-slate-400">
                امتیاز فعلی
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <CheckCircle2
                className="mb-3 text-emerald-400"
                size={25}
              />
              <strong className="block text-2xl font-black">
                {isHydrated ? completedCount.toLocaleString("fa-IR") : "—"}
              </strong>
              <span className="text-xs text-slate-400">
                مأموریت تکمیل‌شده
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#141d32] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-black">پیشرفت مأموریت‌ها</h2>
          <span className="text-sm text-violet-300">
            {isHydrated ? progress.toLocaleString("fa-IR") : "—"}٪
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-l from-violet-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${isHydrated ? progress : 0}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-slate-400">
          {isHydrated
            ? `${completedCount.toLocaleString("fa-IR")} مأموریت از ${missions.length.toLocaleString("fa-IR")} مأموریت`
            : "در حال بارگذاری..."}
        </p>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-black">
            🎯 مأموریت‌های موجود
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            فعلاً تکمیل پروفایل فعال است؛ سایر مأموریت‌ها
            در مراحل بعد اضافه می‌شوند.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              {...mission}
            />
          ))}
        </div>
      </section>

      {isHydrated && isProfileComplete && (
        <p className="text-sm text-emerald-400">
          پروفایل شما تکمیل شده و پاداش آن ثبت شده است.
        </p>
      )}
    </div>
  );
}
