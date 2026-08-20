"use client";

import { useState } from "react";
import { InterviewReport } from "@/types";
import { WeakAreasRadar } from "@/components/reports/WeakAreasRadar";
import { RecommendationsCard } from "@/components/reports/RecommendationsCard";
import { BarChart3, Award, Sparkles, CheckCircle2, ArrowUpRight, Clock, Video, Mic, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  const [report] = useState<InterviewReport>({
    id: "rep-9901",
    date: "Aug 20, 2026",
    overallScore: 88,
    candidateProfile: {
      resumeSummary: "sanskar_resume.pdf",
      targetRole: "Senior Full Stack Engineer",
      targetCompany: "Google",
      previousPerformanceScore: 87,
    },
    speechAnalysis: {
      speedWpm: 138,
      pauseCount: 3,
      pauseDurationSec: 1.6,
      fillerWords: [
        { word: "um", count: 2 },
        { word: "like", count: 1 },
      ],
      totalFillerCount: 3,
      fluencyScore: 89,
    },
    videoAnalysis: {
      eyeContactPct: 92,
      headPoseStability: "Stable",
      facePresence: true,
      expression: "Confident",
    },
    llmEvaluation: {
      technicalDepthScore: 90,
      communicationScore: 88,
      starFrameworkScore: 86,
      overallScore: 88,
      keyStrengths: [
        "Excellent architectural detail mentioning CRDTs and Operational Transformation.",
        "Clear quantitative result mentioned during database latency explanation.",
        "High eye contact stability (92%) and confident speech delivery."
      ],
      improvedSampleAnswer:
        "To design Google Docs collaborative infrastructure at scale, I would utilize Conflict-free Replicated Data Types (CRDTs) to ensure state convergence across distributed clients. Client nodes communicate delta operations over WebSocket connections backed by a Redis Pub/Sub layer."
    },
    weakAreas: [
      {
        id: "w-1",
        area: "Filler Word Frequency",
        category: "Speech Analysis",
        severity: "Medium",
        impactDescription: "Used filler words ('um', 'like') 3 times during transition pauses.",
        metricObserved: "3 fillers / 45 sec",
      },
      {
        id: "w-2",
        area: "System Design Trade-off Depth",
        category: "Technical Depth",
        severity: "High",
        impactDescription: "Did not explicitly contrast OT vs CRDT trade-offs regarding memory overhead.",
        metricObserved: "Missing OT memory comparison",
      },
    ],
    recommendations: [
      {
        id: "r-1",
        title: "System Design Mastery: Distributed State & CRDTs",
        type: "Course",
        actionableStep: "Complete Module 4 on Operational Transformation vs CRDT memory trade-offs.",
        relatedCourseId: "c-101",
        estimatedTimeToFix: "2.5 Hours",
      },
      {
        id: "r-2",
        title: "Speech Cadence & Pause Drill",
        type: "Drill",
        actionableStep: "Practice replacing filler words with 1-second deliberate silence pauses.",
        estimatedTimeToFix: "45 Mins",
      },
    ],
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Diagnostic Evaluation
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Interview Diagnostic <span className="text-gradient">Report</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Targeting {report.candidateProfile.targetCompany} ({report.candidateProfile.targetRole})
          </p>
        </div>

        <Link
          href="/interview"
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center gap-2 self-start sm:self-auto"
        >
          Retake Mock Interview <RefreshCw className="w-4 h-4" />
        </Link>
      </div>

      {/* Top Overall Score Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Overall Readiness Score</div>
          <div className="text-4xl font-extrabold text-white">{report.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span></div>
          <div className="text-xs font-semibold text-emerald-400 mt-2">Passed Google Target Threshold (85+)</div>
        </div>

        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Speech Telemetry</div>
          <div className="text-4xl font-extrabold text-purple-400">{report.speechAnalysis.fluencyScore}%</div>
          <div className="text-xs text-slate-400 mt-2">{report.speechAnalysis.speedWpm} WPM • {report.speechAnalysis.totalFillerCount} Fillers</div>
        </div>

        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Video Telemetry</div>
          <div className="text-4xl font-extrabold text-cyan-400">{report.videoAnalysis.eyeContactPct}%</div>
          <div className="text-xs text-slate-400 mt-2">Eye Contact • {report.videoAnalysis.headPoseStability}</div>
        </div>

        <div className="p-6 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">STAR Adherence</div>
          <div className="text-4xl font-extrabold text-pink-400">{report.llmEvaluation.starFrameworkScore}%</div>
          <div className="text-xs text-slate-400 mt-2">Structured STAR response</div>
        </div>
      </div>

      {/* Weak Areas Radar Component */}
      <WeakAreasRadar weakAreas={report.weakAreas} />

      {/* Actionable Course Recommendations Component */}
      <RecommendationsCard recommendations={report.recommendations} />

      {/* LLM Improved Sample Response */}
      <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" /> High-Scoring Sample Answer Refinement
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-mono p-4 rounded-2xl bg-slate-950 border border-slate-800">
          "{report.llmEvaluation.improvedSampleAnswer}"
        </p>
      </div>

    </div>
  );
}
