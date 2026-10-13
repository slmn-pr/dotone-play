
"use client";

import { useEffect, useState } from "react";
import { GameResult } from "./GameResult";

type Position = { x: number; y: number };

function randomPosition(): Position {
  return {
    x: 8 + Math.random() * 84,
    y: 12 + Math.random() * 76,
  };
}

export function StarClickGame() {
  const [runId, setRunId] = useState(() => crypto.randomUUID());
  const [status, setStatus] = useState<"ready" | "playing" | "finished">("ready");
  const [time, setTime] = useState(15);
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });

  useEffect(() => {
    if (status !== "playing") return;

    const timer = window.setInterval(() => {
      setTime((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  function start() {
    setRunId(crypto.randomUUID());
    setTime(15);
    setScore(0);
    setPosition(randomPosition());
    setStatus("playing");
  }

  function catchStar() {
    if (status !== "playing" || time <= 0) return;
    setScore((s) => s + 10);
    setPosition(randomPosition());
  }

  if (status === "playing" && time === 0) {
    // نتیجه در رندر بعدی با وضعیت پایان نمایش داده می‌شود.
    return (
      <GameResult
        runId={runId}
        gameTitle="شکار ستاره"
        score={score}
        onRestart={start}
      />
    );
  }

  if (status === "finished") {
    return (
      <GameResult
        runId={runId}
        gameTitle="شکار ستاره"
        score={score}
        onRestart={start}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between rounded-2xl bg-[#141d32] p-5">
        <div>⏱ {time.toLocaleString("fa-IR")} ثانیه</div>
        <strong className="text-amber-300">
          ⭐ {score.toLocaleString("fa-IR")}
        </strong>
      </div>

      <div className="relative h-[360px] overflow-hidden rounded-[30px] border border-violet-400/20 bg-[radial-gradient(ellipse_at_center,#292159,#0d1429_75%)] sm:h-[480px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#ffffff10_1px,transparent_2px)] bg-[length:35px_35px]" />

        {status === "ready" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
            <span className="text-7xl">⭐</span>
            <h2 className="text-2xl font-black">ستاره‌ها رو شکار کن!</h2>
            <p className="text-sm leading-7 text-slate-300">
              در ۱۵ ثانیه روی هر تعداد ستاره که می‌تونی کلیک کن.
            </p>
            <button
              onClick={start}
              className="rounded-2xl bg-violet-600 px-9 py-4 font-bold hover:bg-violet-500"
            >
              شروع بازی
            </button>
          </div>
        ) : (
          <button
            aria-label="شکار ستاره"
            onClick={catchStar}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            className="absolute flex size-16 -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-amber-300/10 text-5xl drop-shadow-[0_0_20px_#fbbf24] transition-[left,top] duration-150 active:scale-90"
          >
            ⭐
          </button>
        )}
      </div>
    </div>
  );
}
