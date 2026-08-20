"use client";

import { useState } from "react";
import { Question, CandidateProfile } from "@/types";
import { HelpCircle, Lightbulb, CheckCircle2, ChevronRight, Target, Building2, Briefcase } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  profile: CandidateProfile;
  currentIdx: number;
  totalCount: number;
}

export function QuestionCard({ question, profile, currentIdx, totalCount }: QuestionCardProps) {
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
      
      <div>
        {/* Candidate Target Parameters Badge Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-slate-800">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> {profile.targetCompany} Target
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> {profile.targetRole}
          </span>
          <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1.5 ml-auto">
            Question {currentIdx + 1} of {totalCount}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-4">
          "{question.question}"
        </div>
      </div>

      {/* Hints & Ideal Talking Points Toggle */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <button
          onClick={() => setShowHints(!showHints)}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors mb-3"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          {showHints ? "Hide AI Hints & Talking Points" : "Show AI Hints & STAR Talking Points"}
        </button>

        {showHints && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/20 text-xs space-y-3">
            <div>
              <div className="font-bold text-amber-300 mb-1">Recommended Hints:</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                {question.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold text-indigo-300 mb-1">Ideal Talking Points (STAR):</div>
              <div className="flex flex-wrap gap-2">
                {question.idealTalkingPoints.map((tp, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-200">
                    ✓ {tp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
