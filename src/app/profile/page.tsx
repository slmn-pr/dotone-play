
"use client";

import {
  CheckCircle2,
  Coins,
  Crown,
  Gift,
  UserRound,
} from "lucide-react";

import { useGame } from "@/contexts/GameContext";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  const {
    profile,
    points,
    transactions,
    isHydrated,
    isProfileComplete,
    completedMissions,
  } = useGame();

  const completion = isProfileComplete ? 100 : 0;

  const profileRewardReceived =
    completedMissions.includes("complete-profile");

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[30px] border border-violet-400/20 bg-gradient-to-br from-[#29204b] via-[#18213b] to-[#10283a] p-6 sm:p-9">
        <div className="absolute -left-16 -top-20 size-64 rounded-full bg-violet-500/15 blur-[70px]" />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-[28px] border border-white/20 bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
            <UserRound size={47} />
          </div>

          <div className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-xs text-violet-200">
              <Crown size={15} />
              حساب کاربری مای دات پلی
            </span>

            <h1 className="mt-3 break-words text-2xl font-black sm:text-3xl">
              {isHydrated
                ? profile.fullName || "بازیکن مای دات"
                : "در حال بارگذاری..."}
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              بازی کن، مأموریت انجام بده و امتیاز جمع کن.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-4">
            <div className="flex items-center gap-2 text-amber-300">
              <Coins size={22} />
              <span className="text-xs">موجودی امتیاز</span>
            </div>

            <strong className="mt-2 block text-3xl font-black">
              {isHydrated ? points.toLocaleString("fa-IR") : "—"}
            </strong>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <ProfileForm />

        <div className="space-y-5">
          <section className="rounded-[28px] border border-white/10 bg-[#141d32] p-6">
            <h2 className="text-lg font-black">پیشرفت پروفایل</h2>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                میزان تکمیل اطلاعات
              </span>
              <span className="font-bold text-violet-300">
                {isHydrated ? `${completion}٪` : "—"}
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-l from-violet-500 to-cyan-400 transition-all duration-500"
                style={{
                  width: `${isHydrated ? completion : 0}%`,
                }}
              />
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.035] p-4">
              {profileRewardReceived ? (
                <CheckCircle2 className="text-emerald-400" />
              ) : (
                <Gift className="text-amber-300" />
              )}

              <div>
                <p className="text-sm font-bold">
                  پاداش تکمیل پروفایل
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {profileRewardReceived
                    ? "۱۵۰ امتیاز دریافت شده"
                    : "۱۵۰ امتیاز در انتظار تکمیل"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-[#141d32] p-6">
            <h2 className="mb-5 text-lg font-black">
              آخرین فعالیت‌ها
            </h2>

            {!isHydrated ? (
              <p className="text-sm text-slate-400">
                در حال بارگذاری...
              </p>
            ) : transactions.length === 0 ? (
              <p className="text-sm leading-7 text-slate-400">
                هنوز امتیازی دریافت نکردی. اولین مأموریتت
                رو انجام بده!
              </p>
            ) : (
              <div className="space-y-4">
                {transactions.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-bold">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-bold text-emerald-400">
                      +{item.points.toLocaleString("fa-IR")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
