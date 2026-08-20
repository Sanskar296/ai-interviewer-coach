"use client";

import { motion } from "framer-motion";
import { ArrowRight, Video, FileText, BookOpen, BarChart3, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" /> AI Interviewer Coach Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white"
        >
          Master Technical Interviews with <br />
          <span className="text-gradient">Dual Speech & Video Telemetry</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8"
        >
          Configure your candidate profile (Resume + Selected Course + Target Role + Target Company), take dynamic AI mock interviews, and receive actionable reports identifying weak areas and fix recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white shadow-xl shadow-indigo-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm"
          >
            Launch Candidate Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/interview"
            className="px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 font-bold text-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
          >
            Start Mock Interview Arena
          </Link>
        </motion.div>
      </section>

      {/* Workflow Feature Grid */}
      <section className="w-full max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">1. Resume & Candidate Profile</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload resume, choose target course, role, and company to generate tailored interview parameters.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">2. Dual Telemetry Arena</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real-time tracking of Speech (WPM, fillers, pauses) and Video (eye contact, head pose, expressions).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">3. LLM Scoring Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Deep STAR framework scoring, technical accuracy rating, and sentiment evaluations.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">4. Weak Areas & Recommendations</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Detailed diagnosis highlighting precise weak areas paired with targeted courses to fix them.
          </p>
        </div>
      </section>
    </div>
  );
}
