
export type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
};

export type MissionId = "complete-profile";

export type RewardTransaction = {
  id: string;
  title: string;
  points: number;
  createdAt: string;
};

export type GameState = {
  profile: UserProfile;
  points: number;
  completedMissions: MissionId[];
  transactions: RewardTransaction[];
  awardedGameRuns: string[];
};

export type GameContextType = GameState & {
  isHydrated: boolean;
  isProfileComplete: boolean;
  saveProfile: (profile: UserProfile) => void;
  awardGamePoints: (
    runId: string,
    gameTitle: string,
    points: number
  ) => void;
};
