import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen"><Sidebar/><div className="min-w-0 flex-1"><Header/><main id="content" className="mx-auto max-w-[1480px] px-4 pb-28 pt-6 sm:px-8 lg:pb-14 lg:pt-9">{children}</main></div><BottomNavigation/></div>;
}
