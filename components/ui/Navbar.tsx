"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, User, LogIn, LayoutDashboard, Video, FileText, BookOpen, BarChart3 } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Interview Arena", href: "/interview", icon: <Video className="w-4 h-4" /> },
    { label: "Resume ATS", href: "/resume", icon: <FileText className="w-4 h-4" /> },
    { label: "Courses", href: "/courses", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Reports", href: "/reports", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">AI Interviewer</span>
            <span className="text-xs text-indigo-400 font-bold block -mt-1 uppercase tracking-wider">Coach Pro</span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500 transition-all"
            title="Candidate Profile"
          >
            <User className="w-4 h-4" />
          </Link>
          <Link
            href="/(auth)/login"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" /> Login
          </Link>
        </div>
      </div>
    </header>
  );
}
