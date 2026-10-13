
"use client";

import { useEffect, useState } from "react";
import { GameResult } from "./GameResult";

type Position = { x: number; y: number };

function randomTarget(): Position {
  return {
    x: 12 + Math.random() * 76,
    y: 15 + Math.random() * 70,
  };
}

export function AimTrainerGame() {
  const [runId, setRunId] = useState(() => crypto.randomUUID());
  const [status, setStatus] = useState<"ready" | "playing">("ready");
  const [time, setTime] = useState(20);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [target, setTarget] = useState<Position>({ x: 50, y: 50 });

  useEffect(() => {
    if (status !== "playing") return;

    const countdown = window.setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    const moving = window.setInterval(() => {
      setTarget(randomTarget());
    }, 1100);

    return () => {
      window.clearInterval(countdown);
      window.clearInterval(moving);
    };
  }, [status]);

  function start() {
    setRunId(crypto.randomUUID());
    setScore(0);
    setHits(0);
    setMisses(0);
    setTime(20);
    setTarget(randomTarget());
    setStatus("playing");
  }

  function hitTarget() {
    if (status !== "playing" || time === 0) return;
    setHits((prev) => prev + 1);
    setScore((prev) => prev + 20);
    setTarget(randomTarget());
  }

  if (status === "playing" && time === 0) {
    return (
      <div className="space-y-4">
        <p className="text-center text-sm text-slate-300">
          🎯 {hits.toLocaleString("fa-IR")} اصابت /{" "}
          {misses.toLocaleString("fa-IR")} خطا
        </p>
        <GameResult
          runId={runId}
          gameTitle="نشونه گیری"
          score={score}
          onRestart={start}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["⏱ زمان", time],
          ["🎯 اصابت", hits],
          ["⭐ امتیاز", score],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-[#141d32] p-4 text-center">
            <p className="text-xs text-slate-400">{label}</p>
            <strong className="mt-2 block text-2xl font-black">
              {Number(value).toLocaleString("fa-IR")}
            </strong>
          </div>
        ))}
      </div>

      <div
        onPointerDown={(event) => {
          if (
            status === "playing" &&
            time > 0 &&
            event.target === event.currentTarget
          ) {
            setMisses((prev) => prev + 1);
          }
        }}
        className="relative h-[360px] touch-manipulation overflow-hidden rounded-[30px] border border-cyan-400/20 bg-[radial-gradient(circle_at_center,#173454,#091222_80%)] sm:h-[480px]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {status === "ready" ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-7xl">🎯</span>
            <h2 className="mt-5 text-2xl font-black">نشونه‌ات چقدر خوبه؟</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              هدف هر چند لحظه جابه‌جا می‌شه.
              در ۲۰ ثانیه بیشترین اصابت رو ثبت کن.
            </p>
            <button
              onClick={start}
              className="mt-6 rounded-2xl bg-cyan-600 px-8 py-4 font-bold hover:bg-cyan-500"
            >
              شروع چالش
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label="شلیک به هدف"
            onPointerDown={(event) => {
              event.stopPropagation();
              hitTarget();
            }}
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
            }}
            className="absolute z-10 flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[7px] border-red-500 bg-white shadow-[0_0_30px_#ef444480] transition-[left,top] duration-150 active:scale-90"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-red-500">
              <span className="size-5 rounded-full bg-amber-300" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
