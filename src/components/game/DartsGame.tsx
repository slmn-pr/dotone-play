
"use client";

import { useState, type PointerEvent } from "react";
import { GameResult } from "./GameResult";

type Hit = { x: number; y: number; points: number };

const MAX_THROWS = 5;

function calculateScore(distance: number): number {
  if (distance <= 0.1) return 60;
  if (distance <= 0.23) return 40;
  if (distance <= 0.4) return 25;
  if (distance <= 0.6) return 15;
  if (distance <= 0.8) return 5;
  return 0;
}

export function DartsGame() {
  const [runId, setRunId] = useState(() => crypto.randomUUID());
  const [hits, setHits] = useState<Hit[]>([]);
  const [score, setScore] = useState(0);

  function throwDart(event: PointerEvent<HTMLButtonElement>) {
    if (hits.length >= MAX_THROWS) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const distance = Math.hypot((x - 0.5) * 2, (y - 0.5) * 2);
    const earned = calculateScore(distance);

    setHits((prev) => [...prev, { x, y, points: earned }]);
    setScore((prev) => prev + earned);
  }

  function restart() {
    setRunId(crypto.randomUUID());
    setHits([]);
    setScore(0);
  }

  if (hits.length >= MAX_THROWS) {
    return (
      <GameResult
        runId={runId}
        gameTitle="پرتاب دارت"
        score={score}
        onRestart={restart}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#141d32] p-5">
        <span>
          🎯 پرتاب {(hits.length + 1).toLocaleString("fa-IR")} از ۵
        </span>
        <strong className="text-xl text-amber-300">
          {score.toLocaleString("fa-IR")} امتیاز
        </strong>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[#141d32] p-5 text-center sm:p-8">
        <h2 className="text-xl font-black">مرکز هدف رو نشونه بگیر!</h2>
        <p className="mt-3 text-sm text-slate-400">
          هرچه به مرکز نزدیک‌تر بزنی، امتیاز بیشتری می‌گیری.
        </p>

        <button
          type="button"
          aria-label="تخته دارت؛ برای پرتاب روی هدف کلیک کنید"
          onPointerDown={throwDart}
          className="relative mx-auto mt-8 block aspect-square w-full max-w-[420px] touch-manipulation overflow-hidden rounded-full border-[8px] border-[#343d52] shadow-[0_0_60px_#8b5cf633]"
          style={{
            background:
              "repeating-radial-gradient(circle at center, #f8fafc 0%, #f8fafc 10%, #dc2626 10%, #dc2626 23%, #1e293b 23%, #1e293b 40%, #0891b2 40%, #0891b2 60%, #111827 60%, #111827 80%, #334155 80%, #334155 100%)",
          }}
        >
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300" />

          {hits.map((hit, index) => (
            <span
              key={index}
              className="pointer-events-none absolute z-20 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-[10px] font-black text-white shadow-lg"
              style={{
                left: `${hit.x * 100}%`,
                top: `${hit.y * 100}%`,
              }}
            >
              {hit.points}
            </span>
          ))}
        </button>

        <p className="mt-7 text-xs text-slate-400">
          مرکز: ۶۰ امتیاز · حلقه دوم: ۴۰ · سوم: ۲۵
        </p>
      </div>
    </div>
  );
}
