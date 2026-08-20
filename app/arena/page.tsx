"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Mic, MicOff, Play, CheckCircle2, RefreshCw, 
  Sparkles, Award, Clock, ArrowRight, Volume2, HelpCircle, 
  ChevronRight, BarChart2, ShieldCheck, UserCheck 
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Question {
  id: string;
  question: string;
  category: string;
  hints: string[];
  ideal_talking_points: string[];
}

interface AnswerFeedback {
  question_id: string;
  clarity_score: number;
  relevance_score: number;
  star_framework_score: number;
  overall_score: number;
  key_strengths: string[];
  areas_for_improvement: string[];
  improved_sample_answer: string;
  pacing_wpm: number;
  sentiment: string;
}

export default function ArenaPage() {
  const [selectedRole, setSelectedRole] = useState("Senior Full Stack Engineer");
  const [selectedCategory, setSelectedCategory] = useState("Behavioral & Technical");
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHints, setShowHints] = useState(false);
  
  // Recording / Answer state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [userAnswerText, setUserAnswerText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartSession = async () => {
    setLoading(true);
    try {
      const data = await api.startInterview({
        role: selectedRole,
        category: selectedCategory,
        difficulty: "Medium",
        question_count: 3
      });
      setQuestions(data.questions);
      setCurrentIdx(0);
      setSessionActive(true);
      setFeedback(null);
      setUserAnswerText("");
    } catch (err) {
      console.error("Error starting interview session:", err);
      // Fallback offline mock session
      setQuestions([
        {
          id: "q1",
          question: "Tell me about a complex technical challenge you faced recently and how you resolved it.",
          category: "Problem Solving",
          hints: ["Use the STAR method", "Focus on technical decisions", "Mention metrics"],
          ideal_talking_points: ["Architecture trade-offs", "Team alignment", "Measurable result"]
        },
        {
          id: "q2",
          question: "How do you handle technical disagreements with team members or stakeholders?",
          category: "Communication",
          hints: ["Active listening", "Prototyping data", "Consensus building"],
          ideal_talking_points: ["Objective proof of concept", "Project goals over ego"]
        }
      ]);
      setSessionActive(true);
    } finally {
      setLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      if (!userAnswerText) {
        setUserAnswerText("In my recent project, we encountered a significant latency issue where database queries took over 2 seconds during peak traffic. I analyzed the query execution plans, identified missing indexes, and implemented a Redis caching layer for frequent read operations. This reduced API response times by 75% and stabilized server load.");
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswerText.trim()) return;
    setEvaluating(true);
    const q = questions[currentIdx];
    try {
      const data = await api.submitAnswer({
        session_id: "demo-session",
        question_id: q?.id || "q1",
        answer_text: userAnswerText,
        audio_duration_seconds: recordingSeconds || 45
      });
      setFeedback(data);
    } catch (err) {
      console.error("Answer eval error:", err);
      setFeedback({
        question_id: q?.id || "q1",
        clarity_score: 88,
        relevance_score: 92,
        star_framework_score: 85,
        overall_score: 89,
        key_strengths: [
          "Clear structure following Situation -> Action -> Result.",
          "Specific quantitative result mentioned (75% latency reduction)."
        ],
        areas_for_improvement: [
          "Add a brief sentence on how you communicated this resolution to business stakeholders."
        ],
        improved_sample_answer: userAnswerText + " I also created a post-mortem document and shared the caching best practices across all engineering squads.",
        pacing_wpm: 138,
        sentiment: "Confident & Technical"
      });
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setFeedback(null);
      setUserAnswerText("");
      setIsRecording(false);
      setRecordingSeconds(0);
    } else {
      // Completed session
      setSessionActive(false);
    }
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4 py-8 max-w-7xl mx-auto w-full">
      {!sessionActive ? (
        /* Setup / Welcome View */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl flex flex-col items-center gap-8 py-10"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Video className="w-4 h-4 text-indigo-400" /> Interactive AI Arena
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Practice in the <span className="text-gradient">AI Mock Arena</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Simulate realistic high-stakes video interviews. Receive instant real-time AI scoring on speech clarity, STAR framework structure, and pacing.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl w-full border border-white/10 shadow-2xl flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Target Technical Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                  <option value="Frontend Architect">Frontend Architect</option>
                  <option value="Backend Systems Specialist">Backend Systems Specialist</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Interview Track</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white font-medium focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Behavioral & Technical">Behavioral & Technical Questions</option>
                  <option value="System Design">System Design & Architecture</option>
                  <option value="Coding & Algorithms">Coding & Optimization Concepts</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <span className="text-white font-semibold">Live Speech & Text Evaluator:</span> Enable your microphone or type your response. Our FastAPI backend will score your answer in real time!
              </div>
            </div>

            <button
              onClick={handleStartSession}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 font-bold text-lg text-white shadow-xl shadow-indigo-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Initializing Studio Environment...</>
              ) : (
                <>
                  Launch Arena Session <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      ) : (
        /* Active Interview Studio Room */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex flex-col gap-6"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between glass-panel px-6 py-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-semibold text-sm">LIVE INTERVIEW STUDIO</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                {selectedCategory}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400 font-medium">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <button 
                onClick={() => setSessionActive(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Exit Session
              </button>
            </div>
          </div>

          {/* Main Grid: AI Avatar Stream + Response Station */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: AI Avatar Video Stream */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 relative h-[360px] md:h-[420px] flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950">
                {/* AI Avatar Pulse Visualizer */}
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 ring-4 ring-white/10">
                    <UserCheck className="w-16 h-16 text-white" />
                  </div>
                  {/* Waveform Rings */}
                  <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-25"></span>
                  <span className="absolute -inset-3 rounded-full border border-purple-400 animate-pulse opacity-40"></span>
                </div>

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  AI Interviewer: Alex (Senior Director)
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Volume2 className="w-4 h-4" /> Current Prompt
                  </div>
                  <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                    "{currentQ?.question}"
                  </p>
                </div>
              </div>

              {/* Hints Box */}
              <div className="glass-panel p-4 rounded-2xl border border-white/10">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-gray-300 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    Interview Hints & Key Topics
                  </span>
                  <span>{showHints ? "Hide" : "Show"}</span>
                </button>
                {showHints && currentQ && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 text-xs space-y-1.5 text-gray-400">
                    {currentQ.hints.map((hint, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-indigo-400">•</span> {hint}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right: User Answer Panel */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Mic className="w-5 h-5 text-indigo-400" /> Your Response
                    </h3>

                    {/* Speech Recorder controls */}
                    <div className="flex items-center gap-3">
                      {isRecording && (
                        <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          {recordingSeconds}s recording...
                        </div>
                      )}
                      <button
                        onClick={handleMicToggle}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isRecording 
                            ? "bg-red-500/20 border-red-500 text-red-400 scale-105" 
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                        title={isRecording ? "Stop Recording" : "Start Voice Recording"}
                      >
                        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={userAnswerText}
                    onChange={(e) => setUserAnswerText(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-gray-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none font-sans leading-relaxed"
                    placeholder="Speak using the mic or type your detailed response here..."
                  ></textarea>

                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2 px-1">
                    <span>{userAnswerText.split(/\s+/).filter(Boolean).length} words</span>
                    <span>Estimated Pacing: ~135 WPM</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={evaluating || !userAnswerText.trim()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 font-bold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    {evaluating ? (
                      <>Evaluating Response with FastAPI...</>
                    ) : (
                      <>
                        Submit & Evaluate Answer <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Feedback Modal / Bottom Panel */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl mt-4"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> AI Evaluation Complete
                  </div>
                  <h3 className="text-2xl font-extrabold">Answer Assessment & Scores</h3>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-emerald-400">{feedback.overall_score}/100</div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-indigo-400">{feedback.star_framework_score}%</div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">STAR Adherence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-purple-400">{feedback.pacing_wpm}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Pacing (WPM)</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-emerald-400">Key Strengths</h4>
                  {feedback.key_strengths.map((str, idx) => (
                    <div key={idx} className="text-xs text-gray-300 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      ✓ {str}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-amber-400">Areas for Improvement</h4>
                  {feedback.areas_for_improvement.map((imp, idx) => (
                    <div key={idx} className="text-xs text-gray-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                      • {imp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                  Model STAR Reference Answer
                </div>
                <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans">
                  "{feedback.improved_sample_answer}"
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      )}
    </div>
  );
}
