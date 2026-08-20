"use client";

import { useState } from "react";
import { Course } from "@/types";
import { BookOpen, Star, Clock, Users, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function CoursesPage() {
  const [courses] = useState<Course[]>([
    {
      id: "c-101",
      title: "System Design Mastery: Distributed Scale",
      category: "System Design",
      level: "Advanced",
      durationHours: 18,
      rating: 4.9,
      enrolledStudents: 3420,
      thumbnail: "/course1.jpg",
      description: "Master distributed state, CRDTs, Operational Transformation, and WebSocket gateways.",
      skillsTaught: ["Distributed Systems", "Redis Pub/Sub", "Kafka", "CRDTs"],
    },
    {
      id: "c-102",
      title: "Executive Technical Speech & Delivery",
      category: "Communication",
      level: "All Levels",
      durationHours: 6,
      rating: 4.8,
      enrolledStudents: 1890,
      thumbnail: "/course2.jpg",
      description: "Eliminate filler words, master deliberate silence pauses, and structure STAR answers.",
      skillsTaught: ["STAR Method", "Filler Elimination", "Confidence & Pacing"],
    },
    {
      id: "c-103",
      title: "Google & Meta Algorithmic Optimization",
      category: "Coding",
      level: "Hard",
      durationHours: 24,
      rating: 4.95,
      enrolledStudents: 5120,
      thumbnail: "/course3.jpg",
      description: "Conquer complex graph algorithms, dynamic programming, and memory complexity.",
      skillsTaught: ["Dynamic Programming", "Graphs", "Time/Space Complexity"],
    },
  ]);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Candidate Parameter 2
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Selected Preparation <span className="text-gradient">Courses & Drills</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Targeted course modules matching weak areas flagged in interview reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                  {c.category}
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {c.rating}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{c.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {c.skillsTaught.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> {c.durationHours} Hours
              </div>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5">
                Enrolled <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
