"use client";

import Link from "next/link";
import { Bot, User, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
          <Bot className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight">AI Coach</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="/arena" className="hover:text-indigo-400 transition-colors">
          Interview Arena
        </Link>
        <Link href="/resume" className="hover:text-indigo-400 transition-colors">
          Resume ATS
        </Link>
        <Link href="/company" className="hover:text-indigo-400 transition-colors">
          Company Prep
        </Link>
        <Link href="/progress" className="hover:text-indigo-400 transition-colors">
          Progress Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          FastAPI Online
        </div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-sm font-medium">
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </button>
        <button className="md:hidden p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
