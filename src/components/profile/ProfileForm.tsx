
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Save, UserRound } from "lucide-react";

import { useGame } from "@/contexts/GameContext";
import { UserProfile } from "../../../types/game";

export function ProfileForm() {
  const {
    profile,
    isHydrated,
    isProfileComplete,
    saveProfile,
    completedMissions,
  } = useGame();

  const [form, setForm] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isHydrated) {
      setForm(profile);
    }
  }, [isHydrated, profile]);

  const rewardReceived =
    completedMissions.includes("complete-profile");

  function updateField(
    field: keyof UserProfile,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized: UserProfile = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
    };

    if (normalized.fullName.length < 3) {
      setMessage("نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
      setMessage("ایمیل معتبر وارد کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(normalized.phone)) {
      setMessage("شماره موبایل معتبر وارد کنید؛ مانند 09123456789.");
      return;
    }

    saveProfile(normalized);
    setMessage("اطلاعات پروفایل با موفقیت ذخیره شد.");
  }

  if (!isHydrated) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#141d32] p-7 text-slate-400">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#141d32] p-5 sm:p-7">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
          <UserRound size={24} />
        </div>

        <div>
          <h2 className="text-xl font-black">اطلاعات شخصی</h2>
          <p className="mt-1 text-xs text-slate-400">
            برای تکمیل پروفایل، اطلاعات زیر رو وارد کن.
          </p>
        </div>
      </div>

      {isProfileComplete && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <CheckCircle2 size={19} />
          پروفایل شما تکمیل شده است.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-bold">
            نام و نام خانوادگی
          </label>
          <input
            id="fullName"
            required
            minLength={3}
            value={form.fullName}
            onChange={(event) =>
              updateField("fullName", event.target.value)
            }
            placeholder="مثلاً علی رضایی"
            autoComplete="name"
            className="w-full rounded-2xl border border-white/10 bg-[#0c1426] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="example@gmail.com"
            autoComplete="email"
            dir="ltr"
            className="w-full rounded-2xl border border-white/10 bg-[#0c1426] px-4 py-3.5 text-left text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-bold">
            شماره موبایل
          </label>
          <input
            id="phone"
            type="tel"
            required
            inputMode="numeric"
            value={form.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            placeholder="09123456789"
            autoComplete="tel"
            dir="ltr"
            maxLength={11}
            className="w-full rounded-2xl border border-white/10 bg-[#0c1426] px-4 py-3.5 text-left text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
          />
        </div>

        {message && (
          <p role="status" className="text-sm text-cyan-300">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-violet-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white transition hover:brightness-110"
        >
          <Save size={19} />
          ذخیره اطلاعات پروفایل
        </button>

        <p className="text-center text-xs leading-6 text-slate-500">
          {rewardReceived
            ? "پاداش ۱۵۰ امتیازی این مأموریت قبلاً دریافت شده است."
            : "با اولین تکمیل موفق پروفایل، ۱۵۰ امتیاز هدیه دریافت می‌کنی."}
        </p>
      </form>
    </section>
  );
}
