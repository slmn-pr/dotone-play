
import type { ReactNode } from "react";

export type RpsChoice = "rock" | "paper" | "scissors";

export type RpsPhase =
  | "ready"
  | "shaking"
  | "revealed"
  | "finished";

export const RPS_CHOICES: Record<
  RpsChoice,
  { emoji: string; title: string }
> = {
  rock: { emoji: "✊", title: "سنگ" },
  paper: { emoji: "✋", title: "کاغذ" },
  scissors: { emoji: "✌️", title: "قیچی" },
};

type Props = {
  player: "user" | "computer";
  choice: RpsChoice | null;
  phase: RpsPhase;
  winner?: boolean;
  children?: ReactNode;
};

export function RpsHandCard({
  player,
  choice,
  phase,
  winner = false,
  children,
}: Props) {
  const isUser = player === "user";
  const isShaking = phase === "shaking";
  const isRevealed = phase === "revealed";

  const selection =
    isRevealed && choice ? RPS_CHOICES[choice] : null;

  return (
    <div
      className={[
        "rps-hand-card relative isolate flex min-h-[245px] flex-col",
        "items-center justify-center overflow-hidden",
        "rounded-[28px] border p-4 sm:min-h-[345px] sm:p-7",
        isUser
          ? "border-violet-400/30 bg-[#1c1b40]"
          : "border-cyan-400/30 bg-[#102b3e]",
        winner ? "rps-winner" : "",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -top-24 size-60 rounded-full",
          "blur-[75px]",
          isUser ? "bg-violet-600/25" : "bg-cyan-500/20",
        ].join(" ")}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-300 sm:text-xs">
        <span
          className={`size-2 rounded-full ${
            isUser ? "bg-violet-400" : "bg-cyan-400"
          }`}
        />
        {isUser ? "YOU / بازیکن" : "CPU / رقیب"}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:size-60">
        <div className="absolute inset-5 rounded-full border border-white/10" />
        <div className="absolute inset-11 rounded-full border border-white/5" />
      </div>

      <div
        className={[
          "rps-hand relative z-10 flex size-32 items-center",
          "justify-center rounded-full sm:size-48",
          "bg-gradient-to-br from-white/10 to-transparent",
          "shadow-[inset_0_1px_0_#ffffff20,0_20px_60px_#00000030]",
          isShaking ? "rps-shake" : "",
          isRevealed ? "rps-reveal" : "",
        ].join(" ")}
      >
        <span
          className={`select-none text-[82px] leading-none drop-shadow-[0_12px_12px_#0006] sm:text-[125px] ${
            isUser ? "-rotate-12" : "rotate-12"
          }`}
        >
          {selection ? selection.emoji : "✊"}
        </span>
      </div>

      <div className="relative z-10 mt-5 min-h-10 text-center">
        <p className="text-lg font-black text-white sm:text-2xl">
          {isShaking
            ? "در حال انتخاب..."
            : selection
              ? selection.title
              : isUser
                ? "انتخاب با توئه!"
                : "منتظر حرکت تو"}
        </p>
      </div>

      {winner && isRevealed && (
        <span className="absolute bottom-3 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-4 py-1 text-xs font-black text-emerald-300">
          WINNER
        </span>
      )}

      {children}
    </div>
  );
}
