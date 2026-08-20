"use client";

import { CandidateProfile } from "@/types";
import { FileText, BookOpen, Briefcase, Building2, TrendingUp, Sparkles, Edit3 } from "lucide-react";
import Link from "next/link";

interface CandidateProfileCardProps {
  profile: CandidateProfile;
}

export function CandidateProfileCard({ profile }: CandidateProfileCardProps) {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-purple-950/30 border border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Candidate Profile
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Interview Prep Configurator
          </h2>
        </div>
        <Link
          href="/profile"
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Profile Details
        </Link>
      </div>

      {/* 5 Input Parameter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Resume */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-pink-400" /> Resume</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">92 ATS</span>
          </div>
          <div className="text-sm font-bold text-white truncate">sanskar_resume.pdf</div>
          <div className="text-[11px] text-slate-400 mt-1">Uploaded 2 days ago</div>
        </div>

        {/* 2. Selected Course */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-indigo-400" /> Selected Course</span>
          </div>
          <div className="text-sm font-bold text-white truncate">
            {profile.selectedCourse?.title || "System Design Mastery"}
          </div>
          <div className="text-[11px] text-indigo-400 font-medium mt-1">75% Completed</div>
        </div>

        {/* 3. Target Job Role */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-cyan-400" /> Target Role</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{profile.targetRole}</div>
          <div className="text-[11px] text-slate-400 mt-1">Senior Level</div>
        </div>

        {/* 4. Target Company */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-purple-400" /> Target Company</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{profile.targetCompany}</div>
          <div className="text-[11px] text-purple-400 font-medium mt-1">High Demand</div>
        </div>

        {/* 5. Previous Performance */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-400" /> Prev Score</span>
            <span className="text-emerald-400 text-xs font-bold">↑ +5%</span>
          </div>
          <div className="text-2xl font-extrabold text-white">{profile.previousPerformanceScore}/100</div>
          <div className="text-[11px] text-slate-400 mt-1">Last interview 3d ago</div>
        </div>

      </div>
    </div>
  );
}
