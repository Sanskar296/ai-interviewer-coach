"use client";

import { useState } from "react";
import { CandidateProfile, Question } from "@/types";
import { VideoHUD } from "@/components/interview/VideoHUD";
import { SpeechTelemetry } from "@/components/interview/SpeechTelemetry";
import { QuestionCard } from "@/components/interview/QuestionCard";
import { useSpeechVideoAnalysis } from "@/hooks/useSpeechVideoAnalysis";
import { Video, Mic, MicOff, Play, CheckCircle2, Sparkles, ArrowRight, RefreshCw, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();

  // Candidate Profile State (Resume + Course + Role + Company + Score)
  const [profile] = useState<CandidateProfile>({
    resumeSummary: "sanskar_resume.pdf (92 ATS Score)",
    targetRole: "Senior Full Stack Engineer",
    targetCompany: "Google",
    previousPerformanceScore: 87,
    selectedCourse: {
      id: "c-101",
      title: "System Design Mastery",
      category: "System Design",
      level: "Advanced",
      durationHours: 18,
      rating: 4.9,
      enrolledStudents: 3420,
      thumbnail: "/course.jpg",
      description: "Master distributed systems, caching, OT/CRDT algorithms.",
      skillsTaught: ["Distributed Systems", "Redis Caching", "Microservices"]
    }
  });

  // Questions generated for candidate profile
  const [questions] = useState<Question[]>([
    {
      id: "q-101",
      question: "Design Google Docs real-time collaborative document editor infrastructure handling concurrent edits from thousands of active users.",
      category: "System Design",
      difficulty: "Hard",
      companyTarget: "Google",
      roleTarget: "Senior Full Stack Engineer",
      hints: [
        "Mention Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs)",
        "Explain WebSocket pub/sub connection scaling using Redis",
        "Detail snapshot persistence and delta compression"
      ],
      idealTalkingPoints: [
        "Concurrency resolution",
        "WebSocket connection pooling",
        "Redis Pub/Sub delta broadcast",
        "Optimistic UI updates"
      ]
    },
    {
      id: "q-102",
      question: "Tell me about a situation where a critical database query bottleneck occurred in production under heavy load. How did you resolve it?",
      category: "Behavioral",
      difficulty: "Medium",
      companyTarget: "Google",
      roleTarget: "Senior Full Stack Engineer",
      hints: [
        "Follow the STAR framework (Situation, Task, Action, Result)",
        "Include specific quantitative speedup metrics",
        "Detail post-mortem team communication"
      ],
      idealTalkingPoints: [
        "APM profiling & EXPLAIN query plans",
        "Composite indexing & Redis caching",
        "75% latency reduction metric"
      ]
    }
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Hook for speech and video analysis telemetry
  const { speechMetrics, videoMetrics } = useSpeechVideoAnalysis(isRecording);

  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      if (!candidateAnswer) {
        setCandidateAnswer(
          "To design a real-time collaborative editor at scale, I would utilize Conflict-free Replicated Data Types (CRDTs) to handle local state mutations deterministically. On the network layer, client connections would terminate at a scaled WebSocket gateway cluster backed by Redis Pub/Sub for delta broadcasting. For database persistence, snapshot state is periodically committed while maintaining append-only operation logs."
        );
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmitAnswer = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/reports");
    }, 700);
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Video className="w-3.5 h-3.5" /> Interactive AI Arena
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Live Candidate <span className="text-gradient">Interview Arena</span>
          </h1>
        </div>

        <button
          onClick={handleSubmitAnswer}
          disabled={submitting}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-500/25 flex items-center gap-2 self-start sm:self-auto"
        >
          {submitting ? "Processing LLM Evaluation..." : "Finish Interview & Generate Report"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Question Generator Display */}
      <QuestionCard
        question={currentQ}
        profile={profile}
        currentIdx={currentIdx}
        totalCount={questions.length}
      />

      {/* Main Dual Telemetry & Recording Arena Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Video HUD */}
        <div className="lg:col-span-6">
          <VideoHUD telemetry={videoMetrics} isRecording={isRecording} />
        </div>

        {/* Right Column: Candidate Answer Recorder */}
        <div className="lg:col-span-6 backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-indigo-400" /> Candidate Answer Input
              </h3>
              <button
                onClick={handleMicToggle}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isRecording
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse"
                    : "bg-indigo-600 hover:bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30"
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isRecording ? "Stop Recording Answer" : "Start Live Voice Answer"}
              </button>
            </div>

            <textarea
              rows={9}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Your live transcribed answer will appear here, or you can type directly..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                if (currentIdx + 1 < questions.length) {
                  setCurrentIdx(currentIdx + 1);
                  setCandidateAnswer("");
                  setIsRecording(false);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all"
            >
              Skip to Next Question
            </button>

            <button
              onClick={handleSubmitAnswer}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2"
            >
              Submit Answer <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Speech Analysis Telemetry Bar */}
      <SpeechTelemetry telemetry={speechMetrics} isRecording={isRecording} />

    </div>
  );
}
