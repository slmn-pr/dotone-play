
import type { GameCardProps } from "@/components/ui/GameCard";

export const games: GameCardProps[] = [
  {
    title: "سنگ، کاغذ، قیچی",
    category: "رقابتی",
    description: "در پنج راند با کامپیوتر رقابت کن و برنده شو.",
    icon: "✊",
    gradient: "from-violet-600 via-purple-700 to-indigo-950",
    href: "/games/rock-paper-scissors",
    status: "فعال",
  },
  {
    title: "شکار ستاره",
    category: "سرعت عمل",
    description: "در ۱۵ ثانیه هر تعداد ستاره که می‌تونی شکار کن.",
    icon: "⭐",
    gradient: "from-amber-500 via-orange-600 to-rose-900",
    href: "/games/star-click",
    status: "فعال",
  },
  {
    title: "پرتاب دارت",
    category: "دقت",
    description: "با پنج پرتاب دقیق، بیشترین امتیاز رو بگیر.",
    icon: "🎯",
    gradient: "from-rose-500 via-red-700 to-purple-950",
    href: "/games/darts",
    status: "فعال",
  },
  {
    title: "نشونه‌گیری",
    category: "سرعت و دقت",
    description: "هدف متحرک رو شکار کن و مهارتت رو نشون بده.",
    icon: "🎯",
    gradient: "from-cyan-500 via-blue-700 to-indigo-950",
    href: "/games/aim-trainer",
    status: "فعال",
  },
  {
    title: "نبرد حافظه",
    category: "حافظه",
    description: "کارت‌های مشابه رو پیدا کن.",
    icon: "🧠",
    gradient: "from-teal-500 to-blue-900",
    href: "/games/memory",
    status: "به‌زودی",
  },
  {
    title: "کوییز قهرمان",
    category: "دانستنی‌ها",
    description: "به سؤال‌های چالش‌برانگیز جواب بده.",
    icon: "🏆",
    gradient: "from-orange-500 to-fuchsia-900",
    href: "/games/quiz",
    status: "به‌زودی",
  },
];
