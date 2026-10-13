
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import { AppShell } from "@/components/layout/AppShell";
import { GameProvider } from "@/contexts/GameContext";

import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دات‌وان پلی | DotOne Play",
  description: "پلتفرم بازی و پاداش دات‌وان",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <GameProvider>
          <AppShell>{children}</AppShell>
        </GameProvider>
      </body>
    </html>
  );
}
