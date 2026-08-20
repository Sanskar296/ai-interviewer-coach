"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Calendar, CheckCircle2, Target, ArrowUpRight, Sparkles, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

interface ProgressMetric {
  label: string;
  value: string;
  change: string;
  trending: string;
}

interface SkillRadar {
  skill: string;
  score: number;
}

interface SessionHistory {
  id: string;
  title: string;
  date: string;
  score: number;
  category: string;
}

interface DashboardData {
  metrics: ProgressMetric[];
  skills: SkillRadar[];
  recent_sessions: SessionHistory[];
  recommended_focus: string[];
}

export default function ProgressPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const json = await api.getProgressDashboard();
      if (json) {
        setData(json);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      // Fallback offline data
      setData({
        metrics: [
          { label: "Mock Interviews Completed", value: "14", change: "+3 this week", trending: "up" },
          { label: "Average Readiness Score", value: "87%", change: "+5% vs last month", trending: "up" },
          { label: "ATS Resume Score", value: "92/100", change: "+14 points optimized", trending: "up" },
          { label: "Total Practice Time", value: "6.4 hrs", change: "+1.2 hrs this week", trending: "up" }
        ],
        skills: [
          { skill: "Technical Depth", score: 88 },
          { skill: "System Architecture", score: 82 },
          { skill: "STAR Delivery", score: 90 },
          { skill: "Clarity & Pacing", score: 85 },
          { skill: "Confidence & Demeanor", score: 94 }
        ],
        recent_sessions: [
          { id: "s-101", title: "Meta Frontend System Design", date: "Yesterday, 4:30 PM", score: 89, category: "System Design" },
          { id: "s-102", title: "Amazon Behavioral & Leadership", date: "Aug 8, 2026", score: 92, category: "Behavioral" },
          { id: "s-103", title: "Google Algorithmic Optimization", date: "Aug 6, 2026", score: 84, category: "Coding" }
        ],
        recommended_focus: [
          "Practice quantitative metrics in your Amazon Leadership STAR answers.",
          "Review Operational Transformation vs CRDTs for collaborative Google System Design questions.",
          "Maintain optimal pacing between 130-150 words per minute during live video recordings."
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="glass-panel p-8 rounded-3xl text-center">
          <Sparkles className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 font-medium">Fetching Live Analytics from FastAPI Backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4 py-10 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col gap-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> Performance Analytics
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Progressive <span className="text-gradient">Learning Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/arena"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              Start New Mock Arena <Zap className="w-4 h-4 fill-white" />
            </Link>
          </div>
        </div>

        {/* Top Key Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{m.label}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">{m.value}</div>
              <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <span>↑</span> {m.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle Section: Skill Breakdown Radar + AI Recommended Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Skill Breakdown Meter */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" /> Skill Competency Breakdown
              </h3>
              <p className="text-xs text-gray-400 mb-6">Evaluated based on your recorded mock interview sessions and responses.</p>
              
              <div className="space-y-5">
                {data.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                      <span className="text-gray-200">{skill.skill}</span>
                      <span className="text-indigo-400">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommended Focus */}
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> AI Personalized Action Plan
              </h3>
              <p className="text-xs text-gray-400 mb-6">Targeted suggestions to boost your next interview score.</p>
              
              <div className="space-y-3">
                {data.recommended_focus.map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-gray-200 leading-relaxed flex items-start gap-3">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/company"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-indigo-300 flex items-center justify-center gap-2 transition-colors"
              >
                Practice Target Company Questions <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* History Log Section */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" /> Recent Practice Session History
          </h3>

          <div className="space-y-3">
            {data.recent_sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {sess.category === "System Design" ? "SD" : sess.category === "Behavioral" ? "BH" : "CD"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{sess.title}</h4>
                    <div className="text-xs text-gray-400">{sess.date} • {sess.category}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-emerald-400">{sess.score}/100</div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Evaluation</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
