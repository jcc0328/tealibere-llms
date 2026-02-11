import Link from "next/link";
import { FileCode2, Files, LayoutDashboard, Settings } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/scripts", label: "Script Generator", icon: FileCode2 },
  { href: "/dashboard/requests", label: "Request Ledger", icon: Files },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-800 p-5 md:border-b-0 md:border-r">
        <h1 className="text-xl font-semibold text-blue-300">PrivacyWidget</h1>
        <nav className="mt-6 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-800">
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <section className="p-5 md:p-8">{children}</section>
    </div>
  );
}
