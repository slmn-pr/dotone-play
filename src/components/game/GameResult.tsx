
"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Coins, RotateCcw, Trophy } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

type Props = {
  runId: string;
  gameTitle: string;
  score: number;
  onRestart: () => void;
};

export function GameResult({ runId, gameTitle, score, onRestart }: Props) {
  const { awardGamePoints, awardedGameRuns, isHydrated } = useGame();
  const [saving, setSaving] = useState(false);

  const saved = awardedGameRuns.includes(runId);
  const reward = Math.max(0, Math.min(300, Math.floor(score)));

  function claimReward() {
    if (!isHydrated || saved || saving || reward === 0) return;
    setSaving(true);
    awardGamePoints(runId, gameTitle, reward);
  }

  return (
    <div className="mx-auto max-w-lg rounded-[30px] border border-violet-400/20 bg-[#141d32] p-6 text-center sm:p-9">
      <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-amber-400/10">
        <Trophy className="text-amber-300" size={43} />
      </div>

      <h2 className="mt-6 text-2xl font-black">پایان بازی!</h2>
      <p className="mt-3 text-slate-400">عملکردت در این دور</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs text-slate-400">امتیاز این دور</p>
        <strong className="mt-2 block text-5xl font-black text-amber-300">
          {score.toLocaleString("fa-IR")}
        </strong>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-violet-200">
          <Coins size={17} />
          پاداش قابل ثبت: {reward.toLocaleString("fa-IR")}
        </div>
      </div>

      {saved && (
        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-emerald-400">
          <CheckCircle2 size={18} /> امتیاز به موجودی اضافه شد
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {saved ? (
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 p-4 font-bold hover:bg-violet-500"
          >
            <RotateCcw size={18} /> بازی دوباره
          </button>
        ) : (
          <button
            disabled={!isHydrated || saving || reward === 0}
            onClick={claimReward}
            className="rounded-2xl bg-violet-600 p-4 font-bold disabled:opacity-40"
          >
            {reward === 0 ? "امتیازی کسب نشد" : "دریافت امتیاز"}
          </button>
        )}

        <Link
          href="/games"
          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center font-bold"
        >
          بازگشت به بازی‌ها
        </Link>
      </div>
    </div>
  );
}
