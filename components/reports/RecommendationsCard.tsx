"use client";

import { Recommendation } from "@/types";
import { CheckCircle2, BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  return (
    <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" /> Actionable Recommendations & Courses
          </h3>
          <p className="text-xs text-slate-400">Tailored practice drills and courses to resolve your weak areas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-950/80 to-indigo-950/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {rec.type}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {rec.estimatedTimeToFix}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{rec.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{rec.actionableStep}</p>
            </div>

            <Link
              href="/courses"
              className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 group"
            >
              Enroll & Fix Area <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
