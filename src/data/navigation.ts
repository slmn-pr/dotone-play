import { Gamepad2, Gift, House, Target, Trophy, Wallet, UserRound } from "lucide-react";
export const navigation = [
  { href: "/", label: "خانه", icon: House },
  { href: "/games", label: "بازی‌ها", icon: Gamepad2 },
  { href: "/missions", label: "مأموریت‌ها", icon: Target },
  { href: "/rewards", label: "جوایز", icon: Gift },
  { href: "/wallet", label: "کیف پول", icon: Wallet },
  { href: "/leaderboard", label: "رتبه‌بندی", icon: Trophy },
  { href: "/profile", label: "پروفایل", icon: UserRound },
] as const;
