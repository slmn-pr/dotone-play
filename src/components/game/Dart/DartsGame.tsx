
"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  ArrowDown,
  Crosshair,
  Flame,
  RotateCcw,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import {
  DartBoard,
  calculateDartScore,
  type DartHit,
} from "./DartBoard";

import "../styles/darts-game.css";
import { GameResult } from "../GameResult";

const MAX_THROWS = 5;
const FLIGHT_DURATION = 680;

type Phase = "ready" | "dragging" | "flying" | "finished";

type Point = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function DartsGame() {
  const [runId, setRunId] = useState("");
  const [phase, setPhase] = useState<Phase>("ready");

  const [hits, setHits] = useState<DartHit[]>([]);
  const [score, setScore] = useState(0);
  const [lastHit, setLastHit] = useState<DartHit | null>(null);

  const [drag, setDrag] = useState<Point>({ x: 0, y: 0 });
  const [aim, setAim] = useState<Point>({ x: 0, y: 0 });

  const [projectile, setProjectile] = useState<Point | null>(
    null
  );

  const [power, setPower] = useState(0);

  const startPointer = useRef<Point>({ x: 0, y: 0 });
  const dragRef = useRef<Point>({ x: 0, y: 0 });
  const activePointer = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("ready");
  const flightTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    return () => {
      if (flightTimer.current) clearTimeout(flightTimer.current);
    };
  }, []);

  function changePhase(next: Phase) {
    phaseRef.current = next;
    setPhase(next);
  }

  function reset() {
    if (flightTimer.current) {
      clearTimeout(flightTimer.current);
      flightTimer.current = null;
    }

    activePointer.current = null;
    dragRef.current = { x: 0, y: 0 };

    setRunId(crypto.randomUUID());
    setHits([]);
    setScore(0);
    setLastHit(null);
    setDrag({ x: 0, y: 0 });
    setAim({ x: 0, y: 0 });
    setProjectile(null);
    setPower(0);

    changePhase("ready");
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (phaseRef.current !== "ready") return;

    // جلوگیری از شروع با کلیک راست ماوس
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();

    activePointer.current = event.pointerId;

    startPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };

    dragRef.current = { x: 0, y: 0 };

    event.currentTarget.setPointerCapture(event.pointerId);
    changePhase("dragging");
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (
      phaseRef.current !== "dragging" ||
      activePointer.current !== event.pointerId
    ) {
      return;
    }

    const dx = clamp(
      event.clientX - startPointer.current.x,
      -110,
      110
    );

    const dy = clamp(
      event.clientY - startPointer.current.y,
      0,
      180
    );

    const nextDrag = { x: dx, y: dy };

    dragRef.current = nextDrag;
    setDrag(nextDrag);

    // قدرت مطلوب حدود ۱۱۰ پیکسل کشیدن به پایین است.
    // کشیدن کمتر، پرتاب را پایین‌تر می‌برد.
    // کشیدن بیشتر، پرتاب را بالاتر می‌برد.
    setAim({
      x: clamp(dx * 0.82, -100, 100),
      y: clamp((110 - dy) * 0.85, -100, 100),
    });

    setPower(Math.round((dy / 180) * 100));
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (
      phaseRef.current !== "dragging" ||
      activePointer.current !== event.pointerId
    ) {
      return;
    }

    activePointer.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const { x, y } = dragRef.current;

    if (y < 35) {
      changePhase("ready");
      setDrag({ x: 0, y: 0 });
      setPower(0);
      return;
    }

    throwDart(x, y);
  }

  function pointerCancel() {
    activePointer.current = null;
    dragRef.current = { x: 0, y: 0 };
    setDrag({ x: 0, y: 0 });
    setPower(0);

    if (phaseRef.current === "dragging") {
      changePhase("ready");
    }
  }

  function throwDart(dx: number, dy: number) {
    if (phaseRef.current !== "dragging") return;

    if (!runId) {
      setRunId(crypto.randomUUID());
    }

    changePhase("flying");

    // کمی پراکندگی برای شبیه‌سازی دقت پرتاب
    const accuracy = clamp(
      12 - Math.abs(dy - 110) * 0.035,
      5,
      12
    );

    const deviationX = (Math.random() - 0.5) * accuracy;
    const deviationY = (Math.random() - 0.5) * accuracy;

    const finalX = clamp(
      dx * 0.82 + deviationX,
      -105,
      105
    );

    const finalY = clamp(
      (110 - dy) * 0.85 + deviationY,
      -105,
      105
    );

    setProjectile({ x: finalX, y: finalY });

    flightTimer.current = setTimeout(() => {
      const result = calculateDartScore(finalX, finalY);

      const hit: DartHit = {
        id: Date.now() + Math.random(),
        x: finalX,
        y: finalY,
        score: result.score,
        label: result.label,
      };

      setHits((previous) => [...previous, hit]);
      setScore((previous) => previous + result.score);
      setLastHit(hit);
      setProjectile(null);
      setDrag({ x: 0, y: 0 });
      setPower(0);

      // بعد از پرتاب پنجم، نتیجه نهایی
      if (hits.length + 1 >= MAX_THROWS) {
        changePhase("finished");
      } else {
        changePhase("ready");
      }

      flightTimer.current = null;
    }, FLIGHT_DURATION);
  }

  if (phase === "finished") {
    const bullseyes = hits.filter(
      (hit) => hit.label === "BULLSEYE!"
    ).length;

    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <section className="rounded-[28px] border border-amber-400/20 bg-[#141d32] p-6 text-center">
          <Trophy
            className="mx-auto text-amber-300"
            size={44}
          />
          <h2 className="mt-4 text-2xl font-black">
            مسابقه دارت تموم شد!
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">
                مجموع پرتاب‌ها
              </p>
              <strong className="mt-2 block text-3xl font-black">
                {hits.length.toLocaleString("fa-IR")}
              </strong>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">
                Bullseye
              </p>
              <strong className="mt-2 block text-3xl font-black text-amber-300">
                {bullseyes.toLocaleString("fa-IR")}
              </strong>
            </div>
          </div>
        </section>

        <GameResult
          runId={runId}
          gameTitle="پرتاب دارت"
          score={score}
          onRestart={reset}
        />
      </div>
    );
  }

  const throwNumber = hits.length + 1;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      {/* Header */}
      <section className="dart-game-header relative overflow-hidden rounded-[28px] border border-amber-400/20 p-5 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-200">
          <Target size={16} />
          DOTONE DARTS CHAMPIONSHIP
        </span>

        <h2 className="mt-5 text-3xl font-black sm:text-4xl">
          قهرمانی پرتاب دارت
        </h2>

        <p className="mt-3 text-sm leading-8 text-slate-300">
          دارت رو به عقب بکش، هدف بگیر و رها کن!
          پنج فرصت برای ثبت بهترین امتیاز داری.
        </p>
      </section>

      {/* HUD */}
      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        <StatBox
          icon={<Target size={19} />}
          label="پرتاب"
          value={`${throwNumber.toLocaleString("fa-IR")} / ۵`}
        />
        <StatBox
          icon={<Trophy size={19} />}
          label="امتیاز"
          value={score.toLocaleString("fa-IR")}
        />
        <StatBox
          icon={<Flame size={19} />}
          label="قدرت"
          value={`${power.toLocaleString("fa-IR")}٪`}
        />
      </section>

      {/* Main Arena */}
      <section className="dart-game-arena relative overflow-hidden rounded-[30px] border border-white/10 p-3 sm:p-6">
        <div className="dart-game-lights pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-[560px]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Crosshair className="text-cyan-300" size={17} />
              میدان دارت
            </div>

            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300">
              ۵ پرتاب
            </span>
          </div>

          <div className="relative">
            <DartBoard
              hits={hits}
              aim={aim}
              showAim={phase === "dragging"}
              flying={phase === "flying"}
              lastHitId={lastHit?.id}
            />

            {/* انیمیشن پرواز دارت */}
            {phase === "flying" && projectile && (
              <div
                className="dart-projectile pointer-events-none absolute z-30"
                style={{
                  left: `${50 + (projectile.x / 224) * 100}%`,
                  top: `${50 + (projectile.y / 224) * 100}%`,
                }}
              >
                <span className="dart-projectile-shape">🎯</span>
              </div>
            )}
          </div>

          {/* نتیجه آخرین پرتاب */}
          <div
            aria-live="polite"
            className={`dart-last-hit mt-4 flex min-h-16 items-center justify-center rounded-2xl border px-4 py-3 text-center ${
              lastHit
                ? lastHit.score >= 40
                  ? "border-amber-400/30 bg-amber-400/10"
                  : "border-white/10 bg-white/5"
                : "border-white/10 bg-white/5"
            }`}
          >
            {phase === "flying" ? (
              <p className="font-black text-cyan-300">
                🚀 دارت در حال پرواز...
              </p>
            ) : lastHit ? (
              <div>
                <p className="text-xs text-slate-400">
                  {lastHit.label}
                </p>
                <strong className="mt-1 block text-xl font-black text-amber-300">
                  +{lastHit.score.toLocaleString("fa-IR")} امتیاز
                </strong>
              </div>
            ) : (
              <p className="text-sm text-slate-300">
                🎯 اولین پرتابت رو انجام بده!
              </p>
            )}
          </div>

          {/* کنترل لمسی */}
          <div className="dart-control-panel mt-5 rounded-[24px] border border-white/10 p-4 sm:p-6">
            <div className="mb-5 text-center">
              <h3 className="text-lg font-black">
                آماده پرتابی؟
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-400">
                دارت رو به پایین بکش، با حرکت افقی هدف
                بگیر و انگشتت رو رها کن.
              </p>
            </div>

            <div className="relative flex h-44 items-start justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#0b1425]/70 pt-4 sm:h-52">
              {/* خطوط راهنما */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
              <div className="pointer-events-none absolute left-0 right-0 top-1/2 border-t border-dashed border-white/10" />

              <button
                type="button"
                onPointerDown={pointerDown}
                onPointerMove={pointerMove}
                onPointerUp={pointerUp}
                onPointerCancel={pointerCancel}
                disabled={phase === "flying"}
                aria-label="دارت را به پایین بکشید و رها کنید"
                className="dart-drag-control relative z-10 flex size-20 touch-none select-none items-center justify-center rounded-full border border-cyan-300/40 bg-[#12344c] shadow-[0_0_35px_#22d3ee33] disabled:opacity-40"
                style={{
                  transform:
                    phase === "dragging"
                      ? `translate(${drag.x}px, ${drag.y}px)`
                      : undefined,
                }}
              >
                <span className="dart-control-emoji text-5xl">
                  🎯
                </span>
              </button>

              {phase === "ready" && (
                <div className="pointer-events-none absolute bottom-3 flex items-center gap-2 text-xs text-slate-400">
                  <ArrowDown size={17} />
                  بکش و رها کن
                </div>
              )}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Zap size={15} className="text-amber-300" />
                  قدرت پرتاب
                </span>
                <span>{power.toLocaleString("fa-IR")}٪</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-cyan-400 via-amber-400 to-orange-500 transition-[width] duration-75"
                  style={{ width: `${power}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#141d32] p-4">
        <p className="text-xs leading-6 text-slate-400">
          مرکز: ۵۰ امتیاز · Double و Triple فعال
        </p>

        <button
          type="button"
          onClick={reset}
          disabled={phase === "flying"}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold transition hover:bg-white/10 disabled:opacity-40"
        >
          <RotateCcw size={16} />
          شروع مجدد
        </button>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#141d32] p-3 sm:p-5">
      <div className="flex items-center gap-2 text-amber-300">
        {icon}
        <span className="text-xs text-slate-400">
          {label}
        </span>
      </div>

      <strong className="mt-3 block text-xl font-black sm:text-3xl">
        {value}
      </strong>
    </div>
  );
}
