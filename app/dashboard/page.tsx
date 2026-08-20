"use client";

import { useState } from "react";
import { CandidateProfile } from "@/types";
import { CandidateProfileCard } from "@/components/dashboard/CandidateProfileCard";
import { WorkflowOverview } from "@/components/dashboard/WorkflowOverview";
import { Video, FileText, BarChart3, ArrowRight, Zap, Award, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [profile, setProfile] = useState<CandidateProfile>({
    resumeSummary: "sanskar_resume.pdf (92 ATS Score)",
    selectedCourse: {
      id: "c-101",
      title: "System Design Mastery",
      category: "System Design",
      level: "Advanced",
      durationHours: 18,
      rating: 4.9,
      enrolledStudents: 3420,
      thumbnail: "/course.jpg",
      description: "Master distributed systems, caching, OT/CRDT algorithms, and load balancing.",
      skillsTaught: ["Distributed Systems", "Redis Caching", "Microservices", "Kafka"]
    },
    targetRole: "Senior Full Stack Engineer",
    targetCompany: "Google",
    previousPerformanceScore: 87,
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Candidate <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-Time Preparation Pipeline & Diagnostic Overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/interview"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center gap-2"
          >
            Launch Interview Arena <Zap className="w-4 h-4 fill-white" />
          </Link>
        </div>
      </div>

      {/* 1. Candidate Profile Parameters Setup (Resume + Course + Role + Company + Score) */}
      <CandidateProfileCard profile={profile} />

      {/* 2. Interactive System Workflow Overview */}
      <WorkflowOverview />

      {/* 3. Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Arena CTA */}
        <Link
          href="/interview"
          className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Live Interview Arena</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Simulate questions generated specifically for {profile.targetCompany} ({profile.targetRole}). Live Speech & Video analysis active.
            </p>
          </div>
          <div className="text-xs font-bold text-indigo-400 flex items-center gap-1">
            Start Arena Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* ATS Resume CTA */}
        <Link
          href="/resume"
          className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Resume ATS Scanner</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Scan resume against {profile.targetRole} criteria to identify missing keywords and formatting improvements.
            </p>
          </div>
          <div className="text-xs font-bold text-pink-400 flex items-center gap-1">
            Optimize Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Reports CTA */}
        <Link
          href="/reports"
          className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Diagnostic Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Inspect your identified weak areas, speech filler counts, eye contact metrics, and targeted course fix recommendations.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            View Diagnostic Reports <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

    </div>
  );
}
