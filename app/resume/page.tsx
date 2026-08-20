"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, CheckCircle2, AlertCircle, Sparkles, Target, Zap, ArrowRight } from "lucide-react";

export default function ResumePage() {
  const [targetRole, setTargetRole] = useState("Senior Full Stack Engineer");
  const [resumeText, setResumeText] = useState(
    "SANSKAR SHARMA - Senior Full Stack Engineer\nEmail: sanskar@example.com | GitHub: github.com/sanskar\n\nEXPERIENCE\nLead Software Engineer | Tech Corp (2022 - Present)\n- Architected high-throughput microservices using Python, FastAPI, React, and Next.js.\n- Implemented Redis caching layers reducing database query latency by 75%.\n- Built CI/CD automated deployment pipelines using Docker and Kubernetes on AWS."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreResult, setScoreResult] = useState<any>({
    atsScore: 92,
    matchPercentage: 88,
    formattingScore: 95,
    foundKeywords: ["React", "Next.js", "Python", "FastAPI", "Redis", "Docker", "AWS"],
    missingKeywords: ["GraphQL", "Kafka", "TypeScript Strict Types"],
    actionVerbs: ["Architected", "Implemented", "Built"],
    suggestions: [
      "Add explicit metrics on team size managed and monthly active users served.",
      "Incorporate missing target role keywords: GraphQL, Kafka.",
      "Ensure uniform single-column formatting for optimal ATS parser parsing."
    ]
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5" /> Candidate Profile Parameter 1
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          ATS Resume <span className="text-gradient">Optimization & Analysis</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Scan your resume text against {targetRole} job parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-400" /> Target Job Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all mb-4"
            />

            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-pink-400" /> Resume Content
            </label>
            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm mt-4"
          >
            {isAnalyzing ? "Scanning ATS Keywords..." : "Run AI ATS Resume Scan"} <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Score & Keyword Diagnostic */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Score Gauges */}
          <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-extrabold text-indigo-400">{scoreResult.atsScore}/100</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-1">ATS Score</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">{scoreResult.matchPercentage}%</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-1">Role Match</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-pink-400">{scoreResult.formattingScore}/100</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-1">Formatting</div>
            </div>
          </div>

          {/* Keyword Coverage */}
          <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Found Technical Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {scoreResult.foundKeywords.map((kw: string, idx: number) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {kw}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-white pt-2">Missing Priority Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {scoreResult.missingKeywords.map((kw: string, idx: number) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {kw}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-white pt-2">AI Optimization Suggestions</h3>
            <ul className="space-y-2">
              {scoreResult.suggestions.map((sug: string, idx: number) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
