import type { GameCardProps } from "@/components/ui/GameCard";
export const games: GameCardProps[] = [
  {
    title: "چالش سرعت",
    category: "سرعت عمل",
    description: "در زمان محدود هدف‌ها رو شکار کن و رکورد بزن.",
    icon: "⚡",
    gradient: "from-violet-600 via-[#573dc4] to-blue-800",
    href: "/games/speed-tap",
    status: "به‌زودی",
  },
  {
    title: "نبرد حافظه",
    category: "حافظه",
    description: "کارت‌های مشابه رو پیدا کن و حافظه‌ات رو محک بزن.",
    icon: "🧠",
    gradient: "from-[#1f9f9a] via-[#126d90] to-[#263e95]",
    href: "/games/memory",
    status: "به‌زودی",
  },
  {
    title: "کوییز قهرمان",
    category: "دانستنی‌ها",
    description: "به سؤال‌ها جواب بده و امتیاز جمع کن.",
    icon: "🏆",
    gradient: "from-[#e09a32] via-[#d45c63] to-[#7436a2]",
    href: "/games/quiz",
    status: "به‌زودی",
  },
  {
    title: "پازل روز",
    category: "فکری",
    description: "با حل معماهای کوتاه، ذهنت رو به چالش بکش.",
    icon: "🧩",
    gradient: "from-[#197fd5] via-[#3159b9] to-[#673ea4]",
    href: "/games/puzzle",
    status: "به‌زودی",
  },
];
