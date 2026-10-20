
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Flame,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

import { StarGameHUD } from "./StarGameHUD";
import { StarBurst, type StarBurstItem } from "./StarBurst";

import "../styles/star-game.css";
import { GameResult } from "../GameResult";

type GameStatus = "ready" | "playing" | "finished";
type Position = { x: number; y: number };

const DURATION = 20;
const BASE_POINTS = 10;
const MAX_POINTS_PER_HIT = 30;
const COMBO_WINDOW = 1500;

function randomPosition(): Position {
  return {
    x: 12 + Math.random() * 76,
    y: 15 + Math.random() * 70,
  };
}

const backgroundStars = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: (i * 37.7 + 13) % 100,
  y: (i * 23.3 + 19) % 100,
  delay: (i % 7) * 0.45,
  size: i % 5 === 0 ? 3 : 2,
}));

export function StarClickGame() {
  const [status, setStatus] = useState<GameStatus>("ready");
  const [runId, setRunId] = useState("");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [position, setPosition] = useState<Position>({
    x: 50,
    y: 50,
  });
  const [bursts, setBursts] = useState<StarBurstItem[]>([]);

  const endTimeRef = useRef(0);
  const lastHitRef = useRef(0);
  const comboRef = useRef(0);
  const activeRef = useRef(false);
  const burstIdRef = useRef(0);
  const burstTimersRef = useRef<ReturnType<
    typeof setTimeout
  >[]>([]);

  const clearBurstTimers = useCallback(() => {
    burstTimersRef.current.forEach(clearTimeout);
    burstTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      activeRef.current = false;
      clearBurstTimers();
    };
  }, [clearBurstTimers]);

  useEffect(() => {
    if (status !== "playing") return;

    let frameId = 0;

    const tick = () => {
      if (!activeRef.current) return;

      const remaining = Math.max(
        0,
        (endTimeRef.current - performance.now()) / 1000
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        activeRef.current = false;
        setStatus("finished");
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [status]);

  function startGame() {
    clearBurstTimers();

    const now = performance.now();

    activeRef.current = true;
    endTimeRef.current = now + DURATION * 1000;
    lastHitRef.current = 0;
    comboRef.current = 0;
    burstIdRef.current = 0;

    setRunId(crypto.randomUUID());
    setTimeLeft(DURATION);
    setScore(0);
    setHits(0);
    setCombo(0);
    setBestCombo(0);
    setBursts([]);
    setPosition(randomPosition());
    setStatus("playing");
  }

  function catchStar() {
    if (!activeRef.current) return;

    const now = performance.now();

    if (now >= endTimeRef.current) {
      activeRef.current = false;
      setTimeLeft(0);
      setStatus("finished");
      return;
    }

    const nextCombo =
      lastHitRef.current > 0 &&
      now - lastHitRef.current <= COMBO_WINDOW
        ? comboRef.current + 1
        : 1;

    comboRef.current = nextCombo;
    lastHitRef.current = now;

    const earned = Math.min(
      MAX_POINTS_PER_HIT,
      BASE_POINTS + (nextCombo - 1) * 2
    );

    setScore((previous) => previous + earned);
    setHits((previous) => previous + 1);
    setCombo(nextCombo);
    setBestCombo((previous) => Math.max(previous, nextCombo));

    const burstId = ++burstIdRef.current;

    const burst: StarBurstItem = {
      id: burstId,
      x: position.x,
      y: position.y,
      points: earned,
    };

    setBursts((previous) => [...previous, burst]);
    setPosition(randomPosition());

    const timer = setTimeout(() => {
      setBursts((previous) =>
        previous.filter((item) => item.id !== burstId)
      );
      burstTimersRef.current = burstTimersRef.current.filter(
        (item) => item !== timer
      );
    }, 800);

    burstTimersRef.current.push(timer);
  }

  if (status === "finished") {
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="rounded-[28px] border border-amber-400/20 bg-[#141d32] p-6 text-center">
          <Trophy
            size={42}
            className="mx-auto text-amber-300"
          />
          <h2 className="mt-4 text-2xl font-black">
            شکار ستاره‌ها تموم شد!
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">
                ستاره‌های شکارشده
              </p>
              <strong className="mt-2 block text-2xl font-black">
                {hits.toLocaleString("fa-IR")}
              </strong>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">
                بهترین Combo
              </p>
              <strong className="mt-2 block text-2xl font-black text-orange-300">
                ×{bestCombo.toLocaleString("fa-IR")}
              </strong>
            </div>
          </div>
        </div>

        <GameResult
          runId={runId}
          gameTitle="شکار ستاره"
          score={score}
          onRestart={startGame}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 sm:space-y-6">
      {/* Game Header */}
      <section className="star-header relative overflow-hidden rounded-[28px] border border-violet-400/20 p-5 sm:p-8">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-bold text-violet-200">
              <Sparkles size={16} />
              DOTONE STAR RUSH
            </span>

            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
              شکار ستاره‌ها
              <span className="mr-2">⭐</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-8 text-slate-300">
              ستاره‌ها رو با سرعت شکار کن، زنجیره Combo
              بساز و بالاترین رکوردت رو ثبت کن!
            </p>
          </div>

          <div className="star-header-orb flex size-24 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10 sm:size-32">
            <Star
              size={60}
              className="fill-amber-300 text-amber-200 drop-shadow-[0_0_20px_#fbbf24] sm:size-[82px]"
            />
          </div>
        </div>
      </section>

      {/* Scoreboard */}
      <StarGameHUD
        score={score}
        timeLeft={timeLeft}
        duration={DURATION}
        combo={combo}
        bestCombo={bestCombo}
      />

      {/* Galaxy Arena */}
      <section className="star-arena relative h-[390px] touch-manipulation select-none overflow-hidden rounded-[30px] border border-violet-400/20 sm:h-[500px]">
        <div className="star-nebula pointer-events-none absolute inset-0" />

        <div className="star-orbit star-orbit-one" />
        <div className="star-orbit star-orbit-two" />

        {backgroundStars.map((item) => (
          <span
            key={item.id}
            className="star-background-dot"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: item.size,
              height: item.size,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}

        {status === "ready" ? (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="star-intro-icon flex size-32 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10">
              <Star
                size={85}
                className="fill-amber-300 text-amber-100"
              />
            </div>

            <h3 className="mt-7 text-2xl font-black sm:text-3xl">
              برای شکار آماده‌ای؟
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-8 text-slate-300">
              ۲۰ ثانیه فرصت داری! هرچی سریع‌تر ستاره‌ها
              رو شکار کنی، Combo و امتیازت بیشتر می‌شه.
            </p>

            <button
              type="button"
              onClick={startGame}
              className="star-primary-button mt-7 inline-flex items-center gap-3 rounded-2xl px-9 py-4 font-black text-[#241406]"
            >
              <Zap size={20} />
              شروع شکار
              <ArrowLeft size={19} />
            </button>
          </div>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-5 z-10 flex justify-center">
              <div className="rounded-full border border-white/10 bg-[#10152b]/70 px-4 py-2 text-xs text-slate-200 backdrop-blur-md">
                ستاره طلایی رو شکار کن!
              </div>
            </div>

            {combo >= 3 && (
              <div className="pointer-events-none absolute inset-x-0 top-16 z-10 flex justify-center">
                <span className="star-combo-label flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/15 px-5 py-2 font-black text-orange-300">
                  <Flame size={18} />
                  COMBO ×{combo}
                </span>
              </div>
            )}

            <button
              type="button"
              aria-label="شکار ستاره"
              onClick={catchStar}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              className="star-target absolute z-10 flex size-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:size-[96px]"
            >
              <Star
                size={66}
                strokeWidth={1.5}
                className="star-target-icon fill-amber-300 text-yellow-100 sm:size-[82px]"
              />
            </button>

            <StarBurst bursts={bursts} />
          </>
        )}
      </section>

      {/* Bottom Instructions */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-[#141d32] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
            <Star size={23} />
          </div>

          <div>
            <p className="text-sm font-black">
              هر ستاره ارزش داره!
            </p>
            <p className="mt-1 text-xs text-slate-400">
              +۱۰ امتیاز پایه · حداکثر +۳۰ با Combo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Flame size={18} className="text-orange-300" />
          <span className="text-xs font-bold text-slate-300">
            Combo: شکارهای متوالی زیر ۱.۵ ثانیه
          </span>
        </div>
      </section>
    </div>
  );
}
