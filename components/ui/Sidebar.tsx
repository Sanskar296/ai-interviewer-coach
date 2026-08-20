"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Video, BookOpen, BarChart3, User, Settings, Compass } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Resume ATS Scanner", href: "/resume", icon: <FileText className="w-5 h-5" /> },
    { label: "Interview Arena", href: "/interview", icon: <Video className="w-5 h-5" /> },
    { label: "Selected Courses", href: "/courses", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Interview Reports", href: "/reports", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Candidate Profile", href: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 border-r border-slate-800/80 min-h-[calc(100vh-64px)] p-4 flex flex-col justify-between hidden lg:flex">
      <div className="flex flex-col gap-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3">
          Candidate Workflow
        </div>
        <nav className="flex flex-col gap-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 text-center">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-2">
          <Compass className="w-4 h-4" />
        </div>
        <div className="text-xs font-bold text-white mb-1">Target: Google AI</div>
        <div className="text-[11px] text-slate-400">Current Score: 87/100</div>
      </div>
    </aside>
  );
}
