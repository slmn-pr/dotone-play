
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  Gamepad2,
  RotateCcw,
  Sparkles,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";

import { GameResult } from "./GameResult";
import {
  RpsHandCard,
  RPS_CHOICES,
  type RpsChoice,
  type RpsPhase,
} from "./handRock/RpsHandCard";

import "./styles/rock-paper-scissors.css";

import { RpsScoreboard } from "./handRock/RpsScoreboard";

const MAX_ROUNDS = 5;
const WIN_POINTS = 50;
const DRAW_POINTS = 10;
const REVEAL_DELAY = 1050;

const choices: RpsChoice[] = [
  "rock",
  "paper",
  "scissors",
];

const beats: Record<RpsChoice, RpsChoice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

type Outcome = "win" | "lose" | "draw" | null;

function randomChoice(): RpsChoice {
  return choices[Math.floor(Math.random() * choices.length)];
}

export function RockPaperScissors() {
  const [runId, setRunId] = useState("");

  const [phase, setPhase] = useState<RpsPhase>("ready");

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);

  const [userChoice, setUserChoice] =
    useState<RpsChoice | null>(null);

  const [computerChoice, setComputerChoice] =
    useState<RpsChoice | null>(null);

  const [outcome, setOutcome] = useState<Outcome>(null);

  const [roundPoints, setRoundPoints] = useState(0);

  const revealTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const locked = useRef(false);

  useEffect(() => {
    return () => {
      if (revealTimer.current !== null) {
        clearTimeout(revealTimer.current);
      }
    };
  }, []);

  function play(choice: RpsChoice) {
    if (locked.current || phase !== "ready") return;

    locked.current = true;

    if (!runId) {
      setRunId(crypto.randomUUID());
    }

    const computer = randomChoice();

    setUserChoice(choice);
    setComputerChoice(computer);
    setOutcome(null);
    setRoundPoints(0);
    setPhase("shaking");

    revealTimer.current = setTimeout(() => {
      let result: Outcome;
      let earned = 0;

      if (choice === computer) {
        result = "draw";
        earned = DRAW_POINTS;
        setDraws((previous) => previous + 1);
      } else if (beats[choice] === computer) {
        result = "win";
        earned = WIN_POINTS;
        setWins((previous) => previous + 1);
      } else {
        result = "lose";
        setLosses((previous) => previous + 1);
      }

      setOutcome(result);
      setRoundPoints(earned);
      setScore((previous) => previous + earned);
      setRound((previous) => previous + 1);
      setPhase("revealed");
      revealTimer.current = null;
    }, REVEAL_DELAY);
  }

  function nextRound() {
    if (phase !== "revealed") return;

    if (round >= MAX_ROUNDS) {
      setPhase("finished");
      return;
    }

    setUserChoice(null);
    setComputerChoice(null);
    setOutcome(null);
    setRoundPoints(0);
    locked.current = false;
    setPhase("ready");
  }

  function restart() {
    if (revealTimer.current !== null) {
      clearTimeout(revealTimer.current);
      revealTimer.current = null;
    }

    locked.current = false;

    setRunId(crypto.randomUUID());
    setPhase("ready");
    setRound(0);
    setScore(0);
    setWins(0);
    setLosses(0);
    setDraws(0);
    setUserChoice(null);
    setComputerChoice(null);
    setOutcome(null);
    setRoundPoints(0);
  }

  if (phase === "finished") {
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="rounded-3xl border border-violet-400/20 bg-[#141d32] p-6 text-center">
          <Trophy
            size={36}
            className="mx-auto text-amber-300"
          />

          <h2 className="mt-3 text-2xl font-black">
            مسابقه تموم شد!
          </h2>

          <p className="mt-3 text-slate-400">
            {wins.toLocaleString("fa-IR")} برد،{" "}
            {draws.toLocaleString("fa-IR")} مساوی و{" "}
            {losses.toLocaleString("fa-IR")} باخت
          </p>
        </div>

        <GameResult
          runId={runId}
          gameTitle="سنگ کاغذ قیچی"
          score={score}
          onRestart={restart}
        />
      </div>
    );
  }

  const currentRound = Math.min(
    round + (phase === "ready" ? 1 : 0),
    MAX_ROUNDS
  );


return (
  <div className="rps-root mx-auto w-full max-w-6xl space-y-5 sm:space-y-7">

    {/* ================= HEADER + ARENA ================= */}
    <section className="rps-stage relative overflow-hidden rounded-[30px] border border-violet-400/20 p-5 sm:p-8">

      <div className="rps-grid pointer-events-none absolute inset-0" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-bold text-violet-200">
            <Gamepad2 size={16} />
            DOTONE ARCADE
          </div>

          <h2 className="mt-4 text-2xl font-black sm:text-4xl">
            نبرد سنگ، کاغذ، قیچی
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            انتخاب کن، با رقیبت بجنگ و قهرمان شو!
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
          <Swords className="text-amber-300" size={28} />

          <div>
            <p className="text-xs text-slate-400">
              راند فعلی
            </p>

            <strong className="text-2xl font-black">
              {currentRound.toLocaleString("fa-IR")}
              <span className="mx-1 text-sm text-slate-400">
                /
              </span>
              {MAX_ROUNDS.toLocaleString("fa-IR")}
            </strong>
          </div>
        </div>
      </div>

      {/* ================= HAND CARDS ================= */}
      <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:gap-6">

        {/* Player */}
        <RpsHandCard
          player="user"
          choice={userChoice}
          phase={phase}
          winner={outcome === "win"}
        />

        {/* Computer */}
        <RpsHandCard
          player="computer"
          choice={computerChoice}
          phase={phase}
          winner={outcome === "lose"}
        />

        {/* VS */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="rps-vs flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-[#12162d] text-xl font-black text-white shadow-[0_0_35px_#8b5cf680] sm:size-20 sm:text-3xl">
            VS
          </div>
        </div>
      </div>

      {/* ================= ROUND RESULT ================= */}
      <div
        aria-live="polite"
        className="relative z-10 mt-5 min-h-[105px]"
      >
        {phase === "shaking" ? (
          <ResultBanner
            icon={<Zap size={24} />}
            title="سنگ... کاغذ... قیچی!"
            subtitle="رقیب در حال انتخاب حرکته"
            variant="neutral"
          />
        ) : phase === "revealed" ? (
          <ResultBanner
            icon={
              outcome === "win" ? (
                <Trophy size={25} />
              ) : outcome === "draw" ? (
                <Sparkles size={25} />
              ) : (
                <Swords size={25} />
              )
            }
            title={
              outcome === "win"
                ? "عالی بود! این راند رو بردی 🎉"
                : outcome === "draw"
                  ? "مساوی شد! 🤝"
                  : "این راند رو باختی!"
            }
            subtitle={
              outcome === "win"
                ? `+${roundPoints.toLocaleString("fa-IR")} امتیاز کسب کردی`
                : outcome === "draw"
                  ? `+${roundPoints.toLocaleString("fa-IR")} امتیاز برای مساوی`
                  : "راند بعدی فرصت جبرانه!"
            }
            variant={outcome ?? "neutral"}
          />
        ) : (
          <ResultBanner
            icon={<Sparkles size={24} />}
            title="برای رقابت آماده‌ای؟"
            subtitle="یکی از سه حرکت پایین رو انتخاب کن"
            variant="neutral"
          />
        )}
      </div>

      {/* ================= CHOICE BUTTONS ================= */}
      <div className="relative z-10 mt-5 rounded-[24px] border border-white/10 bg-[#10182c]/90 p-4 sm:p-6">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black sm:text-xl">
              حرکتت رو انتخاب کن
            </h3>

            <p className="mt-2 text-xs text-slate-400">
              برد: ۵۰ امتیاز · مساوی: ۱۰ امتیاز
            </p>
          </div>

          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:bg-white/10"
          >
            <RotateCcw size={15} />
            شروع مجدد
          </button>
        </div>

        {/* Rock Paper Scissors */}
        <div className="grid grid-cols-3 gap-2 sm:gap-5">
          {choices.map((choice) => {
            const selected = userChoice === choice;

            return (
              <button
                key={choice}
                type="button"
                disabled={phase !== "ready"}
                onClick={() => play(choice)}
                className={[
                  "rps-choice group relative overflow-hidden",
                  "rounded-[18px] border p-3 text-center",
                  "transition-all duration-200",
                  "sm:rounded-[26px] sm:p-6",

                  "disabled:cursor-not-allowed",

                  selected
                    ? "border-violet-400 bg-violet-500/20 shadow-[0_0_25px_#8b5cf640]"
                    : "border-white/10 bg-[#0e172c]",

                  phase === "ready"
                    ? "hover:-translate-y-2 hover:border-violet-400/60 hover:bg-violet-500/10"
                    : "",
                ].join(" ")}
              >
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white/5 text-5xl transition-transform duration-200 group-hover:scale-110 sm:size-24 sm:text-7xl">
                  {RPS_CHOICES[choice].emoji}
                </span>

                <span className="mt-4 block text-sm font-black sm:text-lg">
                  {RPS_CHOICES[choice].title}
                </span>

                {selected && (
                  <span className="mt-2 block text-[11px] font-bold text-violet-300">
                    انتخاب شما
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= NEXT ROUND ================= */}
        {phase === "revealed" && (
          <button
            type="button"
            onClick={nextRound}
            className="rps-next mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-violet-600 to-indigo-600 px-6 py-4 font-black text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110"
          >
            {round >= MAX_ROUNDS
              ? "مشاهده نتیجه نهایی"
              : "راند بعدی"}

            <ArrowLeft size={19} />
          </button>
        )}
      </div>
    </section>

    {/* ================= SCOREBOARD ================= */}
    <RpsScoreboard
      round={round}
      totalRounds={MAX_ROUNDS}
      score={score}
      wins={wins}
      losses={losses}
      draws={draws}
    />
  </div>
);

}

function ResultBanner({
  icon,
  title,
  subtitle,
  variant,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  variant: "win" | "lose" | "draw" | "neutral";
}) {
  const variants = {
    win: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    lose: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    draw: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    neutral: "border-violet-400/20 bg-[#141d32]/80 text-violet-300",
  };

  return (
    <div
      className={`rps-result flex min-h-[105px] items-center justify-center gap-3 rounded-2xl border p-4 text-center ${variants[variant]}`}
    >
      <div className="shrink-0">{icon}</div>
      <div>
        <h3 className="text-base font-black sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-xs text-slate-300 sm:text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
