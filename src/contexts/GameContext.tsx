
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  GameContextType,
  GameState,
  UserProfile,
} from "../../types/game";

const STORAGE_KEY = "dotone-play-state-v1";

const initialState: GameState = {
  profile: {
    fullName: "",
    email: "",
    phone: "",
  },
  points: 0,
  completedMissions: [],
  transactions: [],
  awardedGameRuns: [],
};

const GameContext = createContext<GameContextType | null>(null);

function isComplete(profile: UserProfile) {
  return (
    profile.fullName.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) &&
    /^09\d{9}$/.test(profile.phone)
  );
}

export function GameProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<GameState>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<GameState>;

        setState({
          ...initialState,
          ...parsed,
          profile: {
            ...initialState.profile,
            ...parsed.profile,
          },
          completedMissions: Array.isArray(
            parsed.completedMissions
          )
            ? parsed.completedMissions
            : [],
          transactions: Array.isArray(parsed.transactions)
            ? parsed.transactions
            : [],
          awardedGameRuns: Array.isArray(parsed.awardedGameRuns)
            ? parsed.awardedGameRuns
            : [],
        });
      }
    } catch {
      console.error("Could not restore game state");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      console.error("Could not save game state");
    }
  }, [state, isHydrated]);

  const saveProfile = useCallback((profile: UserProfile) => {
    const normalized: UserProfile = {
      fullName: profile.fullName.trim(),
      email: profile.email.trim().toLowerCase(),
      phone: profile.phone.trim(),
    };

    setState((prev) => {
      const completed = isComplete(normalized);

      const alreadyRewarded =
        prev.completedMissions.includes("complete-profile");

      if (!completed || alreadyRewarded) {
        return {
          ...prev,
          profile: normalized,
        };
      }

      return {
        ...prev,
        profile: normalized,
        points: prev.points + 150,
        completedMissions: [
          ...prev.completedMissions,
          "complete-profile",
        ],
        transactions: [
          {
            id: crypto.randomUUID(),
            title: "پاداش تکمیل پروفایل",
            points: 150,
            createdAt: new Date().toISOString(),
          },
          ...prev.transactions,
        ],
      };
    });
  }, []);

  const awardGamePoints = useCallback(
    (runId: string, gameTitle: string, points: number) => {
      if (
        !runId.trim() ||
        !gameTitle.trim() ||
        !Number.isSafeInteger(points) ||
        points <= 0
      ) {
        return;
      }

      setState((prev) => {
        if (prev.awardedGameRuns.includes(runId)) {
          return prev;
        }

        return {
          ...prev,
          points: prev.points + points,
          awardedGameRuns: [
            ...prev.awardedGameRuns,
            runId,
          ],
          transactions: [
            {
              id: crypto.randomUUID(),
              title: `پاداش بازی ${gameTitle}`,
              points,
              createdAt: new Date().toISOString(),
            },
            ...prev.transactions,
          ],
        };
      });
    },
    []
  );

  return (
    <GameContext.Provider
      value={{
        ...state,
        isHydrated,
        isProfileComplete: isComplete(state.profile),
        saveProfile,
        awardGamePoints,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }

  return context;
}
