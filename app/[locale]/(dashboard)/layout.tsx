import { UserButton } from "@clerk/nextjs";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-charcoal/5 bg-warm-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-charcoal"
          >
            Baby Gok
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <UserButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
