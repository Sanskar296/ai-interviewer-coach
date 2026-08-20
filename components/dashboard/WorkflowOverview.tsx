"use client";

import { motion } from "framer-motion";
import { FileText, BookOpen, Briefcase, Building2, TrendingUp, Cpu, Video, Mic, Brain, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

export function WorkflowOverview() {
  const steps = [
    {
      title: "1. Candidate Profile Setup",
      desc: "Combines Resume + Selected Course + Target Job Role + Target Company + Previous Performance",
      icons: [<FileText className="w-4 h-4" />, <BookOpen className="w-4 h-4" />, <Briefcase className="w-4 h-4" />, <Building2 className="w-4 h-4" />, <TrendingUp className="w-4 h-4" />],
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "2. AI Question Generator",
      desc: "Tailors high-frequency questions matching company & role technical parameters",
      icons: [<Cpu className="w-4 h-4" />],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "3. Live Interview Arena",
      desc: "Simulates high-stakes interview with real-time speech and video recording",
      icons: [<Video className="w-4 h-4" />, <Mic className="w-4 h-4" />],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "4. Speech & Video Dual Telemetry",
      desc: "Speech: Speed, Pauses, Fillers, Fluency | Video: Eye Contact, Head Pose, Expressions",
      icons: [<Mic className="w-4 h-4" />, <Video className="w-4 h-4" />],
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "5. LLM Evaluation & Scoring",
      desc: "Deep STAR framework scoring, technical depth rating, and sentiment analysis",
      icons: [<Brain className="w-4 h-4" />],
      color: "from-blue-500 to-emerald-500",
    },
    {
      title: "6. Interview Report & Recommendations",
      desc: "Detailed diagnostic breakdown identifying Weak Areas & Actionable Course Recommendations",
      icons: [<ShieldAlert className="w-4 h-4" />, <CheckCircle2 className="w-4 h-4" />],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">AI Interviewer System Pipeline</h3>
          <p className="text-xs text-slate-400">Complete Candidate Evaluation Workflow</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-md`}>
                  {step.icons[0]}
                </div>
                <div className="text-xs font-bold text-slate-300 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{step.desc}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-400">
              <span>Step {idx + 1} of 6</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
