import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-semibold text-xl">Admin Portal</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
            >
              Dashboard
            </Link>
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>
    </div>
  );
}
